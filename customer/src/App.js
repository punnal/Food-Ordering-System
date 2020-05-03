import React from "react";
import Button from 'react-bootstrap/Button'
import Fade from 'react-bootstrap/Fade'
import Collapse from 'react-bootstrap/Collapse'
import { Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import MainContents from "./Components/MainContents";
import Footer from "./Components/MyFooter";

import NavBarData from "./Resource/navBarData";
import FooterData from "./Resource/footerData";
import History from './hist/customHistory'

class App extends React.Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            loggedIn: true,
            navBar: NavBarData,
            footer: FooterData,
            currentPage: 0,
            orders:[],
            Overlay: true,
            cartItems: 0
        }
    }

    logIn = () => {
        this.setState({
            loggedIn: true,
        })

    }

    logOut = () => {
        console.log("Logged Out")
        this.setState({
            loggedIn: false,
        })

    }

    addOrder = (order, callback) => {
        if(!this.changeQuantity(order, order.quantity, callback)){
            this.setState(prevState => {
                return ({
                    orders: [...prevState.orders, order],
                    cartItems: prevState.cartItems + order.quantity

                })
            
            }, callback)
        }
    }
    
    deleteOrder = (order, callback) => {
        let newOrders = [...this.state.orders,]
        newOrders =  newOrders.filter((ord) => ord.id === order.id && JSON.stringify(ord.options) === JSON.stringify(order.options)?false:true)
        this.setState(prevState => {
            return ({
                orders: newOrders,
                cartItems: prevState.cartItems - order.quantity
            })
        }, callback)
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
        let quantities = 0
        quantities = quantities + this.state.orders.map(order => order.quantity)
        this.setState(prevState => {
            return ({
                cartItems: quantities
            })
        })
        console.log("end")
        console.log(this.state.orders)
        return exist
    }
    
    resetOrders = (callback) => this.setState({orders:[]}, callback)

    handleClick = () => {
        console.log(this.state.Overlay)
        this.setState({Overlay:false})
    }

    render(){

        return (
            <div className="App">
                <Fade in = {this.state.Overlay} unmountOnExit timeout = {5000}>
                    <div id = "Vanish" className = "StartOverlay">
                        <div className = "VerticalLine"></div>
                        <h1 id = "StartOverlayTitle">Smoke&Grill</h1>
                        <hr id = "LeftLine"/>
                        <hr id = "RightLine"/>
                        <h5 id = "StartOverlaySubTitle">Burgers & Drinks</h5>
                        <Button onClick = {this.handleClick} aria-controls = "Vanish" aria-expanded = {this.state.Overlay} id = "StartOverlayButton" variant = "secondary" >Enter Website</Button>
                    </div>
                </Fade>
                <Router history={History}>
                    <NavigationBar logout={this.logOut} loggedIn={this.state.loggedIn} navBarData={this.state.navBar} cartItems = {this.state.cartItems} />
                    <MainContents login={this.logIn} orders={this.state.orders} addOrders={this.addOrder} deleteOrder={this.deleteOrder} changeQuantity={this.changeQuantity} resetOrders={this.resetOrders}/>
                    <Footer FooterData={this.state.footer} />
                </Router>
            </div>
            );
    }
}

export default App;
