import React from "react"


class GalleryItem extends React.Component {
    constructor(){
        super()
        this.state = {
            showPopup:false
        }
    }

    handleClick = (type) => {
        if(type === "openPopup"){
            this.setState({showPopup:true})
        }
        else if(type === "closePopup"){
            this.setState({showPopup:false})
        }
    }
    render(){
        return (      
            <div>
                <div onClick={() => this.handleClick("openPopup")}>
                    <img src={this.props.picture.link} alt="" height = '200' weight = '200'></img>
                </div>
                {this.state.showPopup?
                    <div>
                        <div onClick={() => this.handleClick("closePopup")}>X</div>
                        <img src={this.props.picture.link} alt=""></img>
                    </div>
                    :null
                }
            </div>
        ) 
    }

}

export default GalleryItem
