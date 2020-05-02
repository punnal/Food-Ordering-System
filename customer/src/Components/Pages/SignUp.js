import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repassword: "",
            address: "",
            phone: "",
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
            <div id = "SignUp" className  = "container pt-2 pb-3">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <div className = "row">
                            <div className = "col">
                                <input onChange={this.handleChange} value={this.state.firstName} type="text" className = "form-control" id="firstName" placeholder="Enter First Name" name="firstName" required />
                            </div>
                            <div className="col">
                                <input onChange={this.handleChange} value={this.state.lastName} type="text" className="form-control" placeholder="Enter Last Name" name="lastName" required />
                            </div>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.email} type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.password} type = "password" className = "form-control" id = "pass" placeholder = "Enter password" name = "password" min = "8" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.repassword} type = "password" className = "form-control" id = "pass" placeholder = "Re-enter Password" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" name = "repassword" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>The password provided must be at least 8 characters long, containing at least one digit, one capital letter, one small letter.</p>
                    <OverlayTrigger 
                            key = "left"
                            placement = "left"
                            overlay = {
                                <Tooltip id = "tooltip-left">
                                    e.g Address: House no.14 St-14, Gulberg III. Phone: 0900-7860100
                                </Tooltip>
                            }
                        >
                    <h2 className = "mt-5">Contact Information</h2>
                    </OverlayTrigger>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.address} type = "text" className = "form-control" id = "address" placeholder = "Address" name = "Address"/>
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.phone} type = "tel" className = "form-control" id = "phone" placeholder = "Phone Number" name = "Phone" pattern = "[0-9]{4}-[0-9]{7}"/>
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>Phone number should be entered in this format: xxxx-xxxxxxx</p>
                    <button type="submit" className = "btn btn-dark">SignUp</button>
                </form>
            </div>
        )
    }

}

export default SignUp


/*<div className = "custom-control custom-checkbox mb-3">
    <input type="checkbox" className = "custom-control-input" id="customCheck" name="remember" />
    <label className = "custom-control-label" for="customCheck">Remember Me</label>
</div>
<button type="submit" className = "btn btn-secondary">SignUp</button>*/