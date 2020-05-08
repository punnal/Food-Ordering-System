import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import Alert from 'react-bootstrap/Alert'
import Api from '../../api/api'
import History from '../../hist/customHistory'

const CLIENT_ID = "769999588913-fetgs6cqh4ugi5ilj84cl8rv4k9utrp2.apps.googleusercontent.com"

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            contents:{
                email: "",
                password: "",
            },
            loading: false,
            error: "",
            visible: false,
        }
    }

    login = (contents) => {
        console.log(contents)
        this.props.login(contents)
        History.push('/')
    }

    responseGoogle = (response) => {
        console.log("Googleee", response)

        if("error" in response)
            return
        
        this.setState({loading:true}, () => { 
            const contents = {
                email:response.profileObj.email,
                firstName:response.profileObj.givenName,
                lastName:response.profileObj.familyName,
                phone: "",
                address: "",
                password: "",
                google: true,
            }
            Axios.post(Api.googleLogin, {"data":contents})
                .then((resp) => {
                    if(resp.data.data.success){//Success
                        console.log("Sucess", response.data)
                        this.login(resp.data.data.contents)
                        console.log("Sucess", resp.data)
                        
                    }else{
                        console.log("Login Failed: ", response.data.data.error)
                    }

                }).catch((error) => {
                    console.log("error", error)
                })
        })

    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({loading:true}, () => { 
            Axios.post(Api.login, {"data":this.state.contents})
                .then((response) => {
                    this.setState({
                        contents:{
                            email: "",
                            password: "",
                        },
                        loading: false
                    }, () => {
                        if(response.data.data.success){//Success
                            console.log("Sucess", response.data)
                            this.login(response.data.data.contents)
                            console.log("Sucess", response.data)
                            
                        }else{
                            console.log("Login Failed: ", response.data.data.error)
                            this.setState({error: response.data.data.error,visible:true}, () =>{
                                window.setTimeout(() => {
                                    this.setState({visible:false})
                                }, 2000)
                            })

                        }
                    })

                }).catch(() => {
                    this.setState({
                        contents:{
                            email: "",
                            password: "",
                        },
                        loading: false
                    }, (error) => {
                        /*this.login({
                            firstName: "punnal",
                            lastName: "baloch",
                            email: "punnal@gmail.com",
                            address: "Lums",
                            phone: "0303-1234567",
                            google: false
                        })//Hardcoded Login. Remove plis*/
                        this.setState({error: "Unable to login",visible:true}, () =>{
                            window.setTimeout(() => {
                            this.setState({visible:false})
                            }, 2000)
                        })
                        console.log("error")
                    })
                })
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ 
            contents:{
                ...this.state.contents,
                [name]: value
            } 
        })
    }

    render() {
        return(
            <div id = "Login" className  = "container pt-2 pb-3">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <label for = "email">Email:</label>
                        <input onChange={this.handleChange} value={this.state.contents.email} type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <label for = "pass">Password:</label>
                        <input onChange={this.handleChange} value={this.state.contents.password} type = "password" className= "form-control" id = "pass" placeholder = "Enter password" name = "password" min = "8" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <button type="submit" className = "btn btn-dark">Sign In</button>
                </form>
                <h3>Or</h3>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText="SignIn with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                <Link to={"/forgot"} >
                    <p>Forgot password?</p>
                </Link>
                <Alert variant = "success" show = {this.state.visible}>
                    <strong>{this.state.error}</strong>
                </Alert>
            </div>
        )
    }

}

export default Login

/*{<div className = "custom-control custom-checkbox mb-3">
                        <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
                        <label className = "custom-control-label" for="customCheck">Remember Me</label>
                    </div>}*/
