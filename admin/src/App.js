import React from 'react';
import { res } from './res.js'
import Header from './Header.js'
import NavBar from './NavBar.js'
import Body from './Body.js'
import Footer from './Footer.js'

class App extends React.Component {

    constructor() {
        super()
        this.state = {'tab': res.admin.navbar.deliveries}
    }

    render() {
        return (
            <div>
                <Header />
                <NavBar />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default App;
