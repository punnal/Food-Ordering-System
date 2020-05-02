import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'

class AboutUs extends React.Component {

    constructor() {
        super()
        this.state = {
            contents: {
                heading: "",
                description: "",
            } 
        }
    }

    componentWillMount(){
        this.setState({loading: true}, () =>
                Axios.get(Api.about)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.data.data)
                        this.setState({
                            contents:response.data
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            contents:{
                                heading:"About Us",
                                description:"This is the Best place to eat"
                            }, 
                        }, () => this.setState({
                            loading: false
                        }))
                    })
        )

    }
    render() {
        return(
            <div className = "AboutUsContainer">
                <div id = "AboutUsFirst">
                    <div className = "AboutUsInfo">
                        <h1 className = "AboutUsSubHeadingLeft">{this.state.contents.heading}</h1>
                        <p>{this.state.contents.description}</p>
                    </div>
                    <img className = "AboutUsImageRight" src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" width = "765" alt = "About Us"/>
                </div>
            </div>
        )
    }

}

export default AboutUs


/*<div id = "AboutUsSecond">
                    <img className = "AboutUsImageLeft" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpA0X3hTtJHL10XImEhWJs7O76YJrR7FDmQxhcPuxLVfNH-iKh&usqp=CAU" width = "765" alt = "About Us"/>
                    <div className = "AboutUsInfo">
                        <h1 className = "AboutUsSubHeadingRight">We believe in hygiene</h1>
                        <p>Quay is one of the country’s most celebrated restaurants; the creation of leading Australian restaurant group, Fink, and Executive Chef Peter Gilmore.
                            The restaurant is an organic space reflective of Peter Gilmore’s nature inspired cuisine. The interplay of textures and colour brings life and a
                            vibrance that embraces the restaurant’s place in the dress circle of Sydney Harbour. An ode to the Australian landscape, from the vast ocean floor,
                            to the cracked bark of a paperbark tree, every detail from the ground up has been thoughtfully considered.</p>
                    </div>
                </div>
                <div id = "AboutUsThird">
                    <div className = "AboutUsInfo">
                        <h1 className = "AboutUsSubHeadingLeft">We Deliver Quality</h1>
                        <p>Quay is one of the country’s most celebrated restaurants; the creation of leading Australian restaurant group, Fink, and Executive Chef Peter Gilmore.
                            The restaurant is an organic space reflective of Peter Gilmore’s nature inspired cuisine. The interplay of textures and colour brings life and a
                            vibrance that embraces the restaurant’s place in the dress circle of Sydney Harbour. An ode to the Australian landscape, from the vast ocean floor,
                            to the cracked bark of a paperbark tree, every detail from the ground up has been thoughtfully considered.</p>
                    </div>
                    <img className = "AboutUsImageRight" src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" width = "765" alt = "About Us"/>
                </div>
                <div id = "AboutUsFourth">
                    <img className = "AboutUsImageLeft" src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" width = "765" alt = "About Us"/>
                    <div className = "AboutUsInfo">
                        <h1 className = "AboutUsSubHeadingRight">Our Staff</h1>
                        <p>Quay is one of the country’s most celebrated restaurants; the creation of leading Australian restaurant group, Fink, and Executive Chef Peter Gilmore.
                            The restaurant is an organic space reflective of Peter Gilmore’s nature inspired cuisine. The interplay of textures and colour brings life and a
                            vibrance that embraces the restaurant’s place in the dress circle of Sydney Harbour. An ode to the Australian landscape, from the vast ocean floor,
                            to the cracked bark of a paperbark tree, every detail from the ground up has been thoughtfully considered.</p>
                    </div>
                </div>*/
