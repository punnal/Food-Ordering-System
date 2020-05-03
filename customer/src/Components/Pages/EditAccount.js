import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'
import History from '../../hist/customHistory'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


class EditAccount extends React.Component {

    constructor() {
        super()
        this.state = {
            contents:{
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                phone: "",
            },
            loading:false,
            error: ""
        }
    }

    componentWillMount() {
        this.setState({
            contents:this.props.info
        })
    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({loading:true}, () => { 
            Axios.post(Api.editaccount, this.state.contents)
                .then((response) => {
                    this.setState({
                        loading: false
                    }, () => {
                        if(response.success){//Success
                            this.props.setInfo(response.data.contents)
                            console.log("Sucess", response.data)
                            
                        }else{
                            console.log("SignUp Failed: ", response.data.error)
                        }
                    })

                }).catch(() => {
                    this.setState({
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
        console.log(this.state.contents)
        return(
            <div id = "SignUp" className  = "container pt-2 pb-3">
                <h2 className = "mt-5">User Account</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <div className = "row">
                            <div className = "col">
                                <input onChange={this.handleChange} value={this.state.contents.firstName} type="text" className = "form-control" id="firstName" placeholder="Enter First Name" name="firstName" required />
                            </div>
                            <div className="col">
                                <input onChange={this.handleChange} value={this.state.contents.lastName} type="text" className="form-control" placeholder="Enter Last Name" name="lastName" required />
                            </div>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.contents.email} type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
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
                        <input onChange={this.handleChange} value={this.state.contents.address} type = "text" className = "form-control" id = "address" placeholder = "Address" name = "address"/>
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className = "form-group">
                        <input onChange={this.handleChange} value={this.state.contents.phone} type = "tel" className = "form-control" id = "phone" placeholder = "Phone Number" name = "phone" pattern = "[0-9]{4}-[0-9]{7}"/>
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p>Phone number should be entered in this format: xxxx-xxxxxxx</p>
                    <button type="submit" className = "btn btn-dark">Save Changes</button>
                </form>
            </div>
        )
    }

}

export default EditAccount


