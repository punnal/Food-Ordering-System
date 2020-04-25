import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import NavigationBar  from './Components/NavigationBar'
import MainContents from './Components/MainContents'
import Footer from './Components/Footer'

import NavBarData from './Resource/navBarData'

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

    addOrder = (order) => {
        this.setState(prevState => {
            let exist = false
            let newOrders = prevState.orders.map((ord) => {
                if(ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options)){
                    console.log("======start ", ord.quantity)
                    ord.quantity = ord.quantity + order.quantity
                    console.log("======end ", ord.quantity)
                    exist = true
                    return ord
                }
                else{
                    return ord
                }
            })
            if(exist){
                return ({
                    orders: newOrders
                })
            }
            else{
                return ({
                    orders: [...newOrders, order]

                })
            }
        })
    }
    
    deleteOrder = (order) => {
        let newOrders = [...this.state.orders,]
        newOrders =  newOrders.filter((ord) => ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options)?false:true)
        this.setState({orders: newOrders})
    }
    
    changeQuantity = (order, changeBy) => {
        console.log("start")
        let newOrders = [...this.state.orders,]
        console.log(newOrders)
        newOrders =  newOrders.map((ord) => {
            const newQuantity = ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options) && !(ord.quantity + changeBy === 0)?ord.quantity + changeBy:ord.quantity
            ord.quantity = newQuantity
            return ord
        })
        this.setState({orders: newOrders})
        console.log("end")
        console.log(this.state.orders)
    }


    render(){

        return (
            <div className="App">
                <Router>
                    <NavigationBar loggedIn={this.state.loggedIn} navBarData={this.state.navBar}/>
                    <MainContents orders={this.state.orders} addOrders={this.addOrder} deleteOrder={this.deleteOrder} changeQuantity={this.changeQuantity}/>
                    <Footer />
                </Router>
            </div>
            );
    }
}

export default App;
