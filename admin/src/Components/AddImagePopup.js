import React from 'react'
import {Popup, PopupH, PopupBody} from './Popup'

class AddImagePopup extends React.Component {

    constructor() {
        super()
        this.state = {photo_url:null}
        this.onImageUpload = this.onImageUpload.bind(this)
    }

    onImageUpload(event){
        let file = event.target.files[0]
        var reader = new FileReader()
        let dataurl = ''
        reader.onload = () => {
            dataurl = reader.result
            console.log(dataurl)
            this.setState(old => {
                return {
                    ...old,
                    'photo_url':dataurl
                }
            })
        }
        reader.readAsDataURL(file)
    }

    render(){
        return (
            <Popup 
                show={this.props.show}>
                <PopupH> Add An Image </PopupH>
                <PopupBody> 
                    <img
                        alt=""
                        src={this.state.photo_url}
                        height={this.props.imgHeight}
                        width={this.props.imgWidth}
                    />
                    <input
                        type="file"
                        onChange={this.onImageUpload}
                    />
                </PopupBody>
                <button onClick={() => this.props.onClose('cancel')}> Close </button>
                <button onClick={() => this.props.onAdd(this.state.photo_url !== null, this.state.photo_url)}> Add </button>
            </Popup>
        )
    }

}

export default AddImagePopup
