import React from 'react'


class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return(
            <div id = "Login" className  = "container pt-2 pb-3">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation"  action = "/action_page.php" novalidate>
                    <div className = "form-group">
                        <label for = "email">Email:</label>
                        <input type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <label for = "pass">Password:</label>
                        <input type = "password" className = "form-control" id = "pass" placeholder = "Enter password" name = "passwords" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "custom-control custom-checkbox mb-3">
                        <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
                        <label className = "custom-control-label" for="customCheck">Remember Me</label>
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