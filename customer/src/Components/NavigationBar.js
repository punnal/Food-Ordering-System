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
            dropdown: false
        }
    }
    
    dataTranslator = (item) => {
        if(item.name == "Customer"){
            if(this.props.loggedIn){
                return (
                    <NavBarItemLoggedIn click={this.handleDropDownClick} item={item} dataTranslator={this.dataTranslator} />
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
                <span id = "badge" class="badge badge-light">{this.props.cartItems}</span>
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

    handleDropDownClick = () => {
        console.log(this.state.dropdown)
        this.setState({
            dropdown: !this.state.dropdown
        })
    }


    render() {
        const navBarItems = this.props.navBarData.map(this.dataTranslator) 
        const navBarItemsDropDown = this.props.navBarData.map(items => {
            if(items.name == "Customer"){
                items.options.loggedIn.options.map(item => {
                   return( 
                   <div>
                        item.name
                    </div>
                )
                })
            }
        })
        
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
                    {this.state.dropdown?
                        <div>
                            {navBarItemsDropDown}
                        </div>
                        : null
                    }
            </div>
        )
    }
    
}

export default NavigationBar
