import React from 'react'
import { res } from '../res/res'
import { Link } from 'react-router-dom'


const NavBarDivider = () => {
    return <div className = {res.admin.css_classes.NavBarDivider}> | </div>
}
const NavBarDropdown = (props) => {
    return <div className = {res.admin.css_classes.NavBarDropdown} > {props.title} </div>
}

class NavBarElement extends React.Component{
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        console.log(event)
    }

    render() {
        return (
            <Link to={res.admin.pages[this.props.id].path}>
                <div 
                    className= {res.admin.css_classes.NavBarElement} 
                    onClick={(event) => this.handleClick(event)}> 
                        {this.props.name} 
                </div>
            </Link>
        )
    }
}

class NavBar extends React.Component {
    render() {
        return (
            <div className = {res.admin.css_classes.NavBar} >
                {
                    res.admin.navbar.left.map( e => {
                        return <NavBarElement key={e} id={e} name={res.admin.pages[e].title} />
                })}
                <NavBarDivider />
                <NavBarDropdown title = {res.admin.navbar.dropdown.title}/>
            </div>
        );
    }
}

export default NavBar
