import React from "react";
import {Link} from 'react-router-dom'

class FooterItem extends React.Component{
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
            <div>
                <Link to={this.state.link} >
                {this.state.name}
                </Link>
            </div>
        )
	}
}

export default FooterItem