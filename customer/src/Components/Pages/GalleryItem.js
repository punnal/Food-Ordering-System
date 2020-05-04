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
                <div className = "GalleryBoxItem" onClick={() => this.handleClick("openPopup")}>
                    <img class = "img-thumbnail" src={this.props.picture.link} alt="" height = '300' width = '350'></img>
                </div>
                {this.state.showPopup?
                    <div className = "GalleryPopup">
                        <div className = "GalleryPopupClose" onClick={() => this.handleClick("closePopup")}><i class="fas fa-times fa-2x"></i></div>
                        <img className="GalleryImageOpen" src={this.props.picture.link} alt=""></img>
                    </div>
                    :null
                }
            </div>
        ) 
    }

}

export default GalleryItem
