import React from "react";
import Classes from "../Resource/className";
import "../css/cssFile.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./Pages/Menu";
import Deals from "./Pages/Deals";
import Gallery from "./Pages/Gallery";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";

import Logo from "../img/phone123.png";
import Logo2 from "../img/email.png";
import FB from "../img/fb.png";
import IG from "../img/insta.png";
import TT from "../img/twitter.png";
import LOC from "../img/location.png";
import Lo from "../img/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 style={{ position: "relative", bottom: "30px" }}>
            <img src={Lo} height="90" width="90" align="middle" />
            <span
              style={{
                position: "relative",
                bottom: "-15px",
              }}
            >
              Smoke&Grill
            </span>
          </h1>
          <p style={{ position: "relative", bottom: "30px" }}>
            Fast-food chain serving fried chicken & big burgers.
          </p>
          <div className="contact"></div>
        </div>
        <div className="footer-section links">
          <div>
            <h2>Quick Links</h2>
            <ul>
              <Link to="/">Menu</Link>
              <Link to="/deals">Deals</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About us</Link>
              <Link to="/contact">Contact us</Link>
            </ul>
          </div>
        </div>
        <div className="footer-section contact-form">
          <span>
            <h3>Contact</h3>
            <img src={Logo} height="25" width="25" />
            &nbsp; 123-456-789 &nbsp;&nbsp;
            <img src={Logo2} height="25" width="25" />
            &nbsp; SMOKE&GRILL@somewhere.com
            <p>ADDRESS: MODEL TOWN</p>
          </span>
        </div>
      </div>
      <div className="footer-bottom">&copy; SMOKE&GRILL|FAST FOOD CHAIN</div>
    </div>
  );
};

export default Footer;
