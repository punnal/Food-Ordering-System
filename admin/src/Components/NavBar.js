import React from 'react'
import { res } from '../res/res'
import { Link } from 'react-router-dom'


class NavBarElement extends React.Component{
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        console.log(event.target)
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

const NavBarDivider = () => {
    return <div className = {res.admin.css_classes.NavBarDivider}></div>
}
class NavBarDropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {'show': false}
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter() {
        this.setState(old => {
            return {
                ...old,
                show: true
            }
        })
    }

    handleMouseLeave() {
        this.setState(old => {
            return {
                ...old,
                show: false
            }
        })
    }

    render() {
        return (
            <div>
                <div className = {res.admin.css_classes.NavBarDropdown}>
                    {this.props.title}
                    <img className = 'DropDownArrow' onMouseEnter = {this.handleMouseEnter} src ={require('../img/polygon.png')} height = '15' width = '15' alt = 'polygon' />
                </div>
                {this.state.show?
                <div className = "DropDownMenu" onMouseLeave = {this.handleMouseLeave}>
                    <div className = "DropDownElement">
                        {
                            this.props.options.map((option, i) => {
                                return <Link key={i} to={option.path}> {option.name} </Link>
                            })
                        }
                    </div>
                </div>
                :
                null
            }
            </div>
        )
    }
}
const LogoImg = () =>  <div className = {res.admin.css_classes.Logo}><img alt="" src = {require('../img/logo.png')} height = '50' width = '50' /></div>
class NavBar extends React.Component {
    render() {
        return (
            <div className = {res.admin.css_classes.NavBar} >
                <LogoImg className = {res.admin.css_classes.Logo} />
                {
                    res.admin.navbar.left.map( e => {
                        return <NavBarElement key={e} id={e} name={res.admin.pages[e].title} />
                })}
                <NavBarDivider />
                <NavBarDropdown 
                    title = {res.admin.navbar.dropdown.title}
                    options= {res.admin.navbar.dropdown.options}
                />
            </div>
        );
    }
}

export default NavBar
