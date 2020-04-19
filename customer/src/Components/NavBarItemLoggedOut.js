import React from 'react'

class NavBarItemLoggedOut extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        
        const navBarItems = this.props.item.options.loggedOut.options.map(this.props.dataTranslator) 
        return(
            <div>
                <div>
                    {navBarItems}
                </div>
            </div>
        )

    }

}

export default NavBarItemLoggedOut
