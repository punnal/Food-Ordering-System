import React from 'react'
import Classes from '../Resource/className'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'
import History from '../hist/customHistory'

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
        this.state = {
            dropdown: false
        }
    }

    handleClick = () => {
        console.log(this.state.dropdown)
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    
    logout = () => {
        console.log("logout")
        this.props.logout()
        History.push('/')
    }

    render() {
        
        /*const navBarItems = this.props.item.options.loggedIn.options.map(this.props.dataTranslator)*/ 
        const DropDownItems = this.props.item.options.loggedIn.options.map(option => {
            if(option.name === "Sign Out"){
                console.log("SignOut: ")
                return(
                    <div onClick={()=>this.logout()}>
                        <Dropdown.Item as='button' className = "DropDownItem">
                            {option.name}
                        </Dropdown.Item>
                    </div>
                )
            }else{
                return(
                    <Link to={option.link} >
                        <Dropdown.Item as='button' className = "DropDownItem">
                            {option.name}
                        </Dropdown.Item>
                    </Link>
                )
            }
        })
        return(
            <div>
                <div className = "NavBarLoggedIn">
                    {this.props.item.options.loggedIn.name}
                    <Dropdown className = "DropDown">
                        <Dropdown.Toggle as={CustomToggle} id ="dropdown-custom-components">
                            <div><i onClick = {this.handleClick} class="fas fa-caret-down fa-2x"></i></div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className = "DropDownMenu">
                           {DropDownItems}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        )

    }

}

export default NavBarItemLoggedIn

/*{navBarItems}*/

/*<div><i class="fas fa-caret-down fa-2x"></i></div>*/
