import React from "react";
import {Link} from 'react-router-dom'

class Footer extends React.Component{
	constructor(){
		super()
		this.state = {

        }
	}

	render(){
		return (
			<footer className = "Footer">
				<div className = "FooterLinksArea">
					<img src = {require("../img/logo.png")} width = '50' height = '50' />
					<h3><span>Smoke&Grill</span></h3>
					<p className = "FooterLinks">
						<Link to='/'>
							<a href="#">Menu</a>
						</Link>
						|
						<Link to='/deals'>
							<a href="#">Deals</a>
						</Link>
						|
						<Link to='/gallery'>
							<a href="#">Gallery</a>
						</Link>
						|
						<Link to='/about'>
							<a href="#">About Us</a>
						</Link>
						|
						<Link to='/contact'>
							<a href="#">Contact Us</a>
						</Link>
						|
						<Link to='/cart'>
							<a href="#">Cart</a>
						</Link>
					</p>
					<p className = "FooterCopyRight">© 2020 Smoke&Grill  Pvt. Ltd.</p>
				</div>
	 
				<div className = "FooterContact">
					<div>
						<i className = "fa fa-map-marker"></i>
						  <p><span>International Market, M Block, Near Malta Pan Shop</span>
							Model Town, Lahore - 54000</p>
					</div>
	 
					<div>
						<i className = "fa fa-phone"></i>
						<p>+92 311 7210000</p>
					</div>
					<div>
						<i class="fa fa-envelope"></i>
						<p><a href = "mailto:smokeandgrill123@gmail.com">smokeandgrill123@gmail.com</a></p>
					</div>
				</div>
				<div className = "FooterAboutArea">
					<p className = "FooterAbout">
						<span>About the company</span>
						We offer delicious food with care and hygeine to your door step or dine in idc</p>
					<div class="footer-icons">
						<a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore"><i className = "fab fa-facebook"></i></a>
						<a href="#"><i className = "fab fa-twitter"></i></a>
						<a href="#"><i className = "fab fa-instagram"></i></a>
						<a href="#"><i className = "fab fa-linkedin"></i></a>
						<a href="#"><i className = "fab fa-youtube"></i></a>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer