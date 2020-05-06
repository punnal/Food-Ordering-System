import React from "react"
import {api_push, api_pull} from '../api/api'

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
        api_push(this.api, {...this.state})
        this.props.setAuth()
    }

    render() {
        return (
            <div>
                <input 
                    value={this.state.username} 
                    onChange={this.onChange}
                    type="text" 
                    id="username"
                />
                <input 
                    value={this.state.password} 
                    onChange={this.onChange}
                    type="password" 
                    id="password"
                />
                <button 
                    class="btn btn-success"
                    onClick={this.onLogin}
                >
                    Login
                </button>
            </div>
        )
    }
}

export default Login
