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
            return ({
                orders: [...prevState.orders, order] 
            })
        })
    }
    
    deleteOrder = (id) => {
        let newOrders = [...this.state.orders,]
        newOrders =  newOrders.filter((ord) => ord.id === id?false:true)
        this.setState({orders: newOrders})
    }
    
    changeQuantity = (id, changeBy) => {
        let newOrders = [...this.state.orders,]
        newOrders =  newOrders.map((ord) => ord.quantity = ord.id === id && !(ord.quantity + changeBy === 0)?ord.quantity + changeBy:ord.quantity + changeBy)
        this.setState({orders: newOrders})
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
