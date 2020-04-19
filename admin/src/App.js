import React from 'react';
import { res } from './res/res.js'
import Header from './Components/Header.js'
import NavBar from './Components/NavBar.js'
import Body from './Components/Body.js'
import Footer from './Components/Footer.js'
import styles from './css/cssFile.css'

class App extends React.Component {

    constructor() {
        super()
        this.state = {'tab': res.admin.navbar.deliveries}
    }

    render() {
        return (
            <div className = 'MainDiv'>
                <Header />
                <NavBar />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default App;
