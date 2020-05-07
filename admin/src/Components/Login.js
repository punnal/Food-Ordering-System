import React from "react"
import {api_push, api_pull} from '../api/api'
import Cookie from 'js-cookie'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.api = '/admin/api/login'
        this.state = {
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onChange(event) {
        const {id, value} = event.target
        this.setState(old => {
            return {
                ...old,
                [id]:value
            }
        })
    }

    onLogin(){
        api_push(this.api, {...this.state}, data => {
            if(data.success){
                this.props.setAuth()
                Cookie.set('session', true)
            }
        })
        //this.props.setAuth()
    }

    render() {
        return (
            <div className="LoginContainer">
                <h1 className="LoginHeading">Welcome to Smoke&Grill Admin System</h1>
                <input class="form-control"
                    value={this.state.username} 
                    onChange={this.onChange}
                    type="text" 
                    id="username"
                    placeholder="Username"
                />
                <input class="form-control"
                    value={this.state.password} 
                    onChange={this.onChange}
                    type="password" 
                    id="password"
                    placeholder="Password"
                />
                <button 
                    class="btn btn-success"
                    type="button"
                    id="LoginButton"
                    onClick={this.onLogin}
                >
                    Login
                </button>
            </div>
        )
    }
}

export default Login
