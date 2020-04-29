import React from 'react'
import Classes from '../Resource/className'

class NavBarItemLoggedOut extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        
        const navBarItems = this.props.item.options.loggedOut.options.map(this.props.dataTranslator) 
        return(
            <div className = {Classes.NavBarLoggedOut}>
                {navBarItems}
            </div>
        )

    }

}

export default NavBarItemLoggedOut
