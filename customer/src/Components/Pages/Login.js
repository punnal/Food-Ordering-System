import React from 'react'


class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = () => {
        console.log(this.state)
    }
    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    render() {
        return(
            <div id = "Login" className  = "container">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <label for = "email">Email:</label>
                        <input onChange={this.handleChange} value={this.state.email} type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <label for = "pass">Password:</label>
                        <input onChange={this.handleChange} value={this.state.password} type = "password" className= "form-control" id = "pass" placeholder = "Enter password" name = "password" min = "8" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        <p>The password provided must be at least 8 characters long, containing at least one digit, one capital letter, one small letter.</p>
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    {/*<div className = "custom-control custom-checkbox mb-3">
                        <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
                        <label className = "custom-control-label" for="customCheck">Remember Me</label>
                    </div>*/}
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
