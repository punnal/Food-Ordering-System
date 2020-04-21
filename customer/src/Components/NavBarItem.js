import React from 'react'
import {Link} from 'react-router-dom'

import Classes from '../Resource/className'


class NavBarItem extends React.Component{
    
    constructor(){
        super()
        this.state = {
            name: ''
        }
    }

    componentDidMount()
    {
        this.setState({
            name: this.props.name,
            link: this.props.link
        })
    }

    render(){
        return(
            <div className={Classes.NavBarItem}>
                <Link to={this.state.link} >
                {this.state.name}
                </Link>
            </div>
        )
        
    }
}

export default NavBarItem
