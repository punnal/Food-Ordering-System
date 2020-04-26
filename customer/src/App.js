import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import MainContents from "./Components/MainContents";
import Footer from "./Components/Footer";

import NavBarData from "./Resource/navBarData";

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            loggedIn: false,
            navBar: NavBarData,
            currentPage: 0,
            orders:[]
        }
    }

    addOrder = (order, callback) => {
        if(!this.changeQuantity(order, order.quantity, callback)){
            this.setState(prevState => {
                return ({
                    orders: [...prevState.orders, order]

                })
            
            }, callback)
        }
    }
    
    deleteOrder = (order, callback) => {
        let newOrders = [...this.state.orders,]
        newOrders =  newOrders.filter((ord) => ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options)?false:true)
        this.setState({orders: newOrders}, callback)
    }
    
    changeQuantity = (order, changeBy, callback) => {
        let newOrders = [...this.state.orders,]
        let exist = false
        newOrders =  newOrders.map((ord) => {
            const newQuantity = ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options) && !(ord.quantity + changeBy === 0)?ord.quantity + changeBy:ord.quantity
            exist = exist || ord.quantity === newQuantity? false:true
            ord.quantity = newQuantity
            return ord
        })
        if(exist){
            this.setState({orders: newOrders}, callback)
        }
        console.log("end")
        console.log(this.state.orders)
        return exist
    }
    
    resetOrders = (callback) => this.setState({orders:[]}, callback)

    render(){

        return (
            <div className="App">
                <Router>
                    <NavigationBar loggedIn={this.state.loggedIn} navBarData={this.state.navBar}/>
                    <MainContents orders={this.state.orders} addOrders={this.addOrder} deleteOrder={this.deleteOrder} changeQuantity={this.changeQuantity} resetOrders={this.resetOrders}/>
                    <Footer />
                </Router>
            </div>
            );
    }
}

export default App;
