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
                <PopupH><div id="GalleryHeadingPopup"> Add An Image </div></PopupH>
                    <button id="GalleryPopupClose" type="button" class="btn btn-danger" onClick={() => this.props.onClose('cancel')}> Close </button>
                    <button id="GalleryPopupAdd" type="button" class="btn btn-success" onClick={() => this.props.onAdd(this.state.photo_url !== null, this.state.photo_url)}> Add </button>
                <PopupBody> 
                    <img id="GalleryImagePopup"
                        alt=""
                        src={this.state.photo_url}
                        height={this.props.imgHeight}
                        width={this.props.imgWidth}
                    />
                    <input className = "form-control"
                        id="GalleryImageUpload"
                        type="file"
                        onChange={this.onImageUpload}
                    />
                </PopupBody>
            </Popup>
        )
    }

}

export default AddImagePopup
