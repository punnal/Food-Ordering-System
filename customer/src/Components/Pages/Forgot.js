import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'
import History from '../../hist/customHistory'

class Forgot extends React.Component {

    constructor() {
        super()
        this.state = {
            contents:{
                email: "",
            },
            loading: false,
            error: ""
        }
    }

    redirect = () => {
        History.push('/login')
    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({loading:true}, () => { 
            Axios.post(Api.forgot, this.state.contents)
                .then((response) => {
                    this.setState({
                        contents:{
                            email: "",
                            password: "",
                        },
                        loading: false
                    }, () => {
                        if(response.data.success){//Success
                            this.redirect()
                            console.log("Sucess", response.data)
                            
                        }else{
                            console.log("Failed: ", response.data.error)
                        }
                    })

                }).catch(() => {
                    this.setState({
                        contents:{
                            email: "",
                        },
                        loading: false
                    }, () => {
                        this.redirect()//Hardcoded Login. Remove plis
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
                <h2 className = "mt-5">Forgot Password</h2>
                <form class="needs-validation" action="javascript:void(0);" onSubmit={this.handleSubmit} novalidate>
                    <div className = "form-group">
                        <label for = "email">Email:</label>
                        <input onChange={this.handleChange} value={this.state.contents.email} type = "email" className = "form-control" id = "email" placeholder = "Enter email" name = "email" required />
                        <div class="valid-feedback">Good to go!</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <button type="submit" className = "btn btn-dark">Send Password</button>
                </form>
            </div>
        )
    }

}

export default Forgot


