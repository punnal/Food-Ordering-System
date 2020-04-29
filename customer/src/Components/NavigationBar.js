import React from 'react'
import NavBarItem from './NavBarItem'
import NavBarItemLoggedIn from './NavBarItemLoggedIn'
import NavBarItemLoggedOut from './NavBarItemLoggedOut'
import Classes from '../Resource/className'
import {Link} from 'react-router-dom'

class NavigationBar extends React.Component{
    
    constructor(){
        super()
        this.state = {
            mobileNav: false,
        }
    }
    
    dataTranslator = (item) => {
        if(item.name == "Customer"){
            if(this.props.loggedIn){
                return (
                    <NavBarItemLoggedIn item={item} dataTranslator={this.dataTranslator} />
                )
            }
            else{
                return (
                    <NavBarItemLoggedOut item={item} dataTranslator={this.dataTranslator} />
                )
            }
                
        }
        else if(item.name == "Divider"){
            return (<div className={Classes.NavBarDivider}></div>)
        }
        else if(item.name == "Cart"){
            return (
            <div className={Classes.Cart}>
                <Link to={item.link}>
                <img src={require('../img/cart.png')} height = '35' width = '35' />
                </Link>
            </div>)
        }
        else{
            return (<NavBarItem link={item.link} name={item.name}/>)
        }
        
    }

    handleClick = () => {
        console.log("Clicked")
        this.setState({
            mobileNav: !this.state.mobileNav,
        })
    }


    render() {
        const navBarItems = this.props.navBarData.map(this.dataTranslator) 
        
        return(
            <div>
                <div className = "MobileIcon">
                    <img onClick = {this.handleClick} src = {require('../img/mobileNav.png')} />
                    {this.state.mobileNav ? 
                        <div className = "mobileNav">
                            <div className = "mobileNavClose"> <img onClick = {this.handleClick} src = {require('../img/close2.png')} /> </div>
                            {navBarItems}
                        </div>
                        : null}
                </div>
                <div className={Classes.NavigationBar}>
                    <img className = {Classes.Logo} src={require('../img/logo.png')} height = '50' width = '50' />
                    {navBarItems}
                </div>
            </div>
        )
    }
    
}

export default NavigationBar
