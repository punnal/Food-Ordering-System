import React from "react";
import Classes from "../Resource/className";
import "../css/cssFile.css";

import Logo from "../img/phone123.png";
import Logo2 from "../img/email.png";
import FB from "../img/fb.png";
import IG from "../img/insta.png";
import TT from "../img/twitter.png";
import LOC from "../img/location.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">
            <span>Smoke&Grill</span>
          </h1>
          <p>Fast-food chain serving fried chicken & big burgers.</p>
          <div className="contact">
            <span>
              <img src={Logo} height="25" width="25" />
              &nbsp; 123-456-789 &nbsp;&nbsp;
            </span>
            <span>
              <img src={Logo2} height="25" width="25" />
              &nbsp; SMOKE&GRILL@somewhere.com
            </span>
          </div>
        </div>
        <div className="footer-section links">
          <div className="social-media">
            <span>
              <h1>SOCIAL MEDIA</h1>
              <a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore">
                <img src={FB} height="38" width="35" />
              </a>
              &nbsp;&nbsp;
              <a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore">
                <img src={IG} height="39" width="50" />
              </a>
              &nbsp;&nbsp;
              <a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore">
                <img src={TT} height="40" width="45" />
              </a>
            </span>
          </div>
        </div>
        <div className="footer-section contact-form">
          <span>
            <h3>LOCATION</h3>
            <p>ADDRESS: MODEL TOWN</p>
            <p>GOOGLE LOCATION:</p>
            <a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore">
              <img src={LOC} height="40" width="45" />
            </a>
          </span>
        </div>
      </div>
      <div className="footer-bottom">&copy; SMOKE&GRILL|FAST FOOD CHAIN</div>
    </div>
  );
};

export default Footer;
