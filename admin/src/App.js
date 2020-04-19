import React from 'react';
import { res } from './res/res'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Body from './Components/Body'
import Footer from './Components/Footer'

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
                <Body tab={this.state.tab}/>
                <Footer />
            </div>
        );
    }
}

export default App;
