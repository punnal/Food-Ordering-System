import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'
import History from '../../hist/customHistory'

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            contents:{
                email: "",
                password: "",
            },
            loading: false,
            error: ""
        }
    }

    login = () => {
        this.props.login()
        History.push('/')
    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({loading:true}, () => { 
            Axios.post(Api.login, this.state.contents)
                .then((response) => {
                    this.setState({
                        contents:{
                            email: "",
                            password: "",
                        },
                        loading: false
                    }, () => {
                        if(response.success){//Success
                            this.login()
                            console.log("Sucess", response.data)
                            
                        }else{
                            console.log("Login Failed: ", response.data.error)
                        }
                    })

                }).catch(() => {
                    this.setState({
                        contents:{
                            email: "",
                            password: "",
                        },
                        loading: false
                    }, () => {
                        this.login()//Hardcoded Login. Remove plis
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
                    <button type="submit" className = "btn btn-dark">Login</button>
                </form>
                <h3>Or</h3>
                <img className = "mx-auto d-block" src = {require("../../img/google.png")} height = '50' weight = '50' />
                <p>Forgot password?</p>
            </div>
        )
    }

}

export default Login

/*{<div className = "custom-control custom-checkbox mb-3">
                        <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
                        <label className = "custom-control-label" for="customCheck">Remember Me</label>
                    </div>}*/
