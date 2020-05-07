import React from "react"
import {api_push, api_pull} from '../api/api'
import Alert from 'react-bootstrap/Alert'
import Cookie from 'js-cookie'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.api = '/admin/api/login'
        this.state = {
            username: '',
            password: '',
            visible: false,
            incorrect: false
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

      sleep =  (milliseconds) => {
        return new Promise (resolve => setTimeout(resolve, milliseconds))
    }

    onLogin(){
         api_push(this.api, {...this.state}, async data => {
            if(data.success){
                this.setState({visible:true}, () =>{
                    window.setTimeout(() => {
                    this.setState({visible:false})
            }, 2000)
        }) 
                await this.sleep(1000) 
                this.props.setAuth()
                Cookie.set('session', true)
            }
            else {
                this.setState({incorrect:true}, () =>{
                    window.setTimeout(() => {
                    this.setState({incorrect:false})
            }, 2000)
        })
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
                <Alert className="AlertIncorrect" variant = "success" show = {this.state.visible}>
                    <strong>Welcome {this.state.username}!</strong>
                </Alert>
                <Alert className="AlertIncorrect" variant = "danger" show = {this.state.incorrect}>
                    <strong>Incorrect Username or Password!</strong>
                </Alert>
            </div>
        )
    }
}

export default Login
