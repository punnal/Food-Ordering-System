import React from "react";
import {Link} from 'react-router-dom'
import Axios from 'axios'

import Api from '../api/api'

class Footer extends React.Component{
    
    constructor() {
        super()
        this.state = {
            about: {
                heading: "",
                description: "",
            }, 
            contacts: {
                address: "",
                phone: "",
                email: "",
            } 
        }
    }

    componentWillMount(){
        this.setState({loading: true}, () => {
                Axios.get(Api.about)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.data.data)
                        this.setState({
                            about:response.data.data
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            about:{
                                heading:"About Us",
                                body:"This is the Best place to eat"
                            }, 
                        }, () => this.setState({
                            loading: false
                        }))
                    })

                Axios.get(Api.contacts)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.data.data)
                        this.setState({
                            contacts:response.data.data
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            contacts:{
                                address:"International Market, M Block, Near Malta Pan Shop\nModel Town, Lahore - 54000",
                                phone:"+92 311 7210000",
                                email: "smokeandgrill123@gmail.com",
                            }, 
                        }, () => this.setState({
                            loading: false
                        }))
                    })

        })

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
						  <p>{this.state.contacts.address}</p>
					</div>
	 
					<div>
						<i className = "fa fa-phone"></i>
						<p>{this.state.contacts.phone}</p>
					</div>
					<div>
						<i class="fa fa-envelope"></i>
						<p><a>{this.state.contacts.email}</a></p>
					</div>
				</div>
				<div className = "FooterAboutArea">
					<p className = "FooterAbout">
						<span>{this.state.about.heading}</span>
                        {this.state.about.body}</p>
                {/*<div class="footer-icons">
						<a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore"><i className = "fab fa-facebook"></i></a>
						<a href="#"><i className = "fab fa-twitter"></i></a>
						<a href="#"><i className = "fab fa-instagram"></i></a>
						<a href="#"><i className = "fab fa-linkedin"></i></a>
						<a href="#"><i className = "fab fa-youtube"></i></a>
                    </div>*/}
				</div>
			</footer>
		)
	}
}

export default Footer
