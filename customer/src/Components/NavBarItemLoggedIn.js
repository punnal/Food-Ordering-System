import React from 'react'
import Classes from '../Resource/className'
import Dropdown from 'react-bootstrap/Dropdown'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </div>
));

class NavBarItemLoggedIn extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
        }
    }

    handleClick = () => {
        console.log(this.state.dropdown)
        this.setState({
            dropdown: true
        })
    }

    

    render() {
        
        const navBarItems = this.props.item.options.loggedIn.options.map(this.props.dataTranslator) 
        return(
            <div>
                <div className = "NavBarLoggedIn">
                    {this.props.item.options.loggedIn.name}
                    <div><i onClick = {this.props.click} class="fas fa-caret-down fa-2x"></i></div>
                </div>
            </div>
        )

    }

}

export default NavBarItemLoggedIn

/*{navBarItems}*/

/*<div><i class="fas fa-caret-down fa-2x"></i></div>*/