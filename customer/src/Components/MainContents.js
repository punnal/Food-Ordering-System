import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Menu from './Pages/Menu'
import Deals from './Pages/Deals'
import Gallery from './Pages/Gallery'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'

const MainContents = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Menu />
                </Route>
                <Route path="/deals">
                    <Deals />
                </Route>
                <Route path="/gallery">
                    <Gallery />
                </Route>
                <Route exact path="/about">
                    <AboutUs />
                </Route>
                <Route path="/contact">
                    <ContactUs />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/orders">
                    <Orders />
                </Route>
            </Switch>
            <h1>These are main contents</h1>
        </div>
    )
}

export default MainContents
