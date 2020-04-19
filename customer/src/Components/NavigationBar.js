import React from 'react'

import NavBarItem from './NavBarItem'

class NavigationBar extends React.Component{
    
    constructor(){
        super()
        this.state = {
            
        }
    }
    
    dataTranslatorNormal = (item) => {
        if(item.name == "Customer"){
            if(this.props.loggedIn){
                const navBarItems = item.options.loggedIn.options.map(this.dataTranslatorNormal) 
                return(
                    <div>
                        <div>
                            {item.options.loggedIn.name}
                        </div>
                        <div>
                            {navBarItems}
                        </div>
                    </div>
                )
            }
            else{
                const navBarItems = item.options.loggedOut.options.map(this.dataTranslatorNormal) 
                return(
                    <div>
                        <div>
                            {navBarItems}
                        </div>
                    </div>
                )
            }
                
        }
        else{
            return (<NavBarItem link={item.link} name={item.name}/>)
        }
        
    }


    render() {
        const navBarItems = this.props.navBarData.map(this.dataTranslatorNormal) 
        
        return(
            <div>
                {navBarItems}
            </div>
        )
    }
    
}

export default NavigationBar
