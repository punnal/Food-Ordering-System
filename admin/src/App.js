import React from 'react';
import { res } from './res/res.js'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer.js'
import Login from './Components/Login'
import Cookie from 'js-cookie'
import {
  BrowserRouter as Router,
  Switch,
    Route,
    Redirect
} from "react-router-dom";

class App extends React.Component {
    constructor(){
        super()
        this.state = {auth:false}
        this.checkAuth = this.checkAuth.bind(this)
        this.cookie = Cookie.get('session')
    }

    checkAuth(cookie){
        return cookie
    }

    componentDidMount(){
        if(this.checkAuth(this.cookie))
            this.setState({auth:true})
    }

    render() {
        return this.state.auth?
            (
                <Router>
                    <Redirect to="/admin/deliveries/pending"/>
                    <div>
                        <NavBar />
                        {
                            res.admin.pages.map((e,i) => {
                                console.log(e.path)
                                return (
                                    <Switch key={e.id}>
                                        <Route path={`${e.path}`} component={ () => React.createElement(e.component, {'id':i, 'deAuth':()=>this.setState({auth:false})})} />
                                    </Switch>
                                )
                            })}
                            <Footer />
                        </div>
                    </Router>
            )
            :
            (
                <Router>
                    <div>
                        <Redirect to="/admin/login"/>
                        <Login 
                            setAuth={() => this.setState({auth:true})} 
                            deAuth = {() => this.setState({auth:false})}
                        />
                    </div>
                </Router>
            )
    }
}

export default App;
