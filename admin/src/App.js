import React from 'react';
import { res } from './res/res.js'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer.js'
import styles from './css/cssFile.css'
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
                <Header />
                <NavBar />
                {
                    res.admin.pages.map(e => {
                        return <Switch key={e.id}>
                            <Route path={e.path} component={e.component} />
                        </Switch>
                })}
                <Footer />
            </div>
            </Router>
        );
    }
}

export default App;
