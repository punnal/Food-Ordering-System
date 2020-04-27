import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./Pages/Menu";
import Deals from "./Pages/Deals";
import Gallery from "./Pages/Gallery";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";

import Classes from "../Resource/className";

const MainContents = (props) => {
    return (
        <div className={Classes.MainContents}>
            <Switch>
                <Route exact path="/">
                    <Menu orders={props.orders} addOrders={props.addOrders}/>
                </Route>
                <Route path="/deals">
                    <Deals orders={props.orders} addOrders={props.addOrders}/>
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
                    <Cart orders={props.orders} addOrders={props.addOrders} deleteOrder={props.deleteOrder} changeQuantity={props.changeQuantity} resetOrders={props.resetOrders}/>
                </Route>
                <Route path="/orders">
                    <Orders />
                </Route>
            </Switch>
        </div>
    )
}

export default MainContents;
