import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


class EditPassword extends React.Component {

    constructor() {
        super()
        this.state = {
            contents:{
                oldPassword: "",
                password: "",
                repassword: "",
            },
            loading:false,
            error: "",
        }
    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({loading:true}, () => { 
            Axios.post(Api.editpassword, this.state.contents)
                .then((response) => {
                    this.setState({
                        contents:{
                            oldPassword: "",
                            password: "",
                            repassword: "",
                        },
                        loading: false
                    }, () => {
                        if(response.success){//Success
                            console.log("Sucess", response.data)
                            
                        }else{
                            console.log("Failed: ", response.data.error)
                        }
                    })

                }).catch(() => {
                    this.setState({
                        contents:{
                            oldPassword: "",
                            password: "",
                            repassword: "",
                        },
                        loading: false
                    }, () => {
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
            <div id = "SignUp" className  = "container pt-2 pb-3">
                <h2 className = "mt-5">Edit Password</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.contents.password} type = "password" className = "form-control" id = "pass" placeholder = "Enter Old password" name = "oldPassword" min = "8" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.contents.password} type = "password" className = "form-control" id = "pass" placeholder = "Enter password" name = "password" min = "8" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.contents.repassword} type = "password" className = "form-control" id = "pass" placeholder = "Re-enter Password" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" name = "repassword" required />
                        <div class="valid-feedback">All done!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>The password provided must be at least 8 characters long, containing at least one digit, one capital letter, one small letter.</p>
                    <button type="submit" className = "btn btn-dark">Change Password</button>
                </form>
            </div>
        )
    }

}

export default EditPassword


