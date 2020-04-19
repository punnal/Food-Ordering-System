import React from 'react'


class NavBarItemLoggedIn extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        
        const navBarItems = this.props.item.options.loggedIn.options.map(this.props.dataTranslator) 
        return(
            <div>
                <div>
                    {this.props.item.options.loggedIn.name}
                </div>
                <div>
                    {navBarItems}
                </div>
            </div>
        )

    }

}

export default NavBarItemLoggedIn
