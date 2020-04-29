import React from 'react';
import { res } from './res/res.js'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <Router>
            <div>
                <NavBar />
                {
                    res.admin.pages.map(e => {
                        return (
                            <Switch key={e.id}>
                                <Route path={`/${e.path.split('/')[1]}`} component={ () => React.createElement(e.component, {'id':e.id})} />
                            </Switch>
                        )
                })}
                <Footer />
            </div>
            </Router>
        );
    }
}

export default App;
