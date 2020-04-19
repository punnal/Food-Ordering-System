import React from 'react';
import './App.css';
import NavigationBar  from './Components/NavigationBar'
import MainContents from './Components/MainContents'
import Footer from './Components/Footer'

class App extends React.Component {
  

    render(){

    return (
        <div className="App">
            <NavigationBar />
            <MainContents />
            <Footer />
        </div>
        );
    }
}

export default App;
