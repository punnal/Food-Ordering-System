import React from 'react'
import { res } from './res.js'

class NavBarElement extends React.Component{
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        console.log(event)
    }

    render() {
        return (
            <div className= {res.admin.css_classes.NavBarElement} 
                onClick={(event) => this.handleClick(event)}> 
                {this.props.name} 
            </div>
        )
    }
}

const NavBarDivider = () => {
    return <div className = {res.admin.css_classes.NavBarDivider}> | </div>
}
const NavBarDropdown = (props) => {
    return <div className = {res.admin.css_classes.NavBarDropdown} > {props.title} </div>
}

const parseNavBar = (navbar) => {
    return Object.keys(navbar).map( (e, i) => {

        if(e === 'accountdropdown')
            return <NavBarDropdown key = {i} title = {navbar[e].title} />
        if(e === 'divider')
            return <NavBarDivider key = {i} />


        return <NavBarElement key = {i} name = {navbar[e]} />
    })
}

class NavBar extends React.Component {
    render() {
        return (
            <div className = {res.admin.css_classes.NavBar} >
                {parseNavBar(res.admin.navbar)}
            </div>
        );
    }
}

export default NavBar
