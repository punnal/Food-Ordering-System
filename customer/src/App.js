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
        }
    }

    handlePageChange = (id, name) => {
        console.log(name)
        this.setState(prevState => {
            return {
                    currentPage: id
            }
        })
    }

    render(){

        return (
            <div className="App">
                <Router>
                    <NavigationBar loggedIn={this.state.loggedIn} navBarData={this.state.navBar}/>
                    <MainContents />
                    <Footer />
                </Router>
            </div>
            );
    }
}

export default App;
