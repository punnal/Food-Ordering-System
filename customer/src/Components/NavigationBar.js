import React from 'react'
import NavBarItem from './NavBarItem'
import NavBarItemLoggedIn from './NavBarItemLoggedIn'
import NavBarItemLoggedOut from './NavBarItemLoggedOut'
import Classes from '../Resource/className'

class NavigationBar extends React.Component{
    
    constructor(){
        super()
        this.state = {
            
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
            return (<div>|</div>)
        }
        else{
            return (<NavBarItem link={item.link} name={item.name}/>)
        }
        
    }


    render() {
        const navBarItems = this.props.navBarData.map(this.dataTranslator) 
        
        return(
            <div className={Classes.NavigationBar}>
                {navBarItems}
            </div>
        )
    }
    
}

export default NavigationBar
