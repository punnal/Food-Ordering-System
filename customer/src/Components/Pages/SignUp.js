import React from 'react'


class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return(
            <div id = "SignUp" className  = "container">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation"  action = "/action_page.php" novalidate>
                    <div className = "form-group">
                        <div className = "row">
                            <div className = "col">
                                <input type="text" className = "form-control" id="firstName" placeholder="Enter First Name" name="FirstName" required />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Enter Last Name" name="LastName" required />
                            </div>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input type = "password" className = "form-control" id = "pass" placeholder = "Enter password" name = "passwords" min = "8" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input type = "password" className = "form-control" id = "pass" placeholder = "Re-enter Password" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" name = "passwords" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>The password provided must be at least 8 characters long, containing at least one digit, one capital letter, one small letter.</p>
                    <h2 className = "mt-5">Contact Information</h2>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" id = "address" placeholder = "Address" name = "Address" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input type = "tel" className = "form-control" id = "phone" placeholder = "Phone Number" name = "Phone" pattern = "[0-9]{4}-[0-9]{7}" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>Phone number should be entered in this format: xxxx-xxxxxxx</p>
                    <div className = "custom-control custom-checkbox mb-3">
                        <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
                        <label className = "custom-control-label" for="customCheck">Remember Me</label>
                    </div>
                    <button type="submit" className = "btn btn-dark">SignUp</button>
                </form>
            </div>
        )
    }

}

export default SignUp
