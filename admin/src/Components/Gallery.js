import React from "react"
import Table from './Table'
import DeleteItemPopup from './DeleteItemPopup'
import AddImagePopup from './AddImagePopup'
import { api_push, api_pull } from '../api/api'

const parseData = (data) => {
    return data
}

class Gallery extends React.Component {

    constructor() {
        super()
        this.state = {data:[], pshow:{'add':false, 'delete':false}}
        this.togglePopup = this.togglePopup.bind(this)
        this.onDeleteClicked = this.onDeleteClicked.bind(this)
        this.onDeletePopupClose = this.onDeletePopupClose.bind(this)
        this.onAddClicked = this.onAddClicked.bind(this)
        this.loadGallery = this.loadGallery.bind(this)
        this.onImageAdded = this.onImageAdded.bind(this)
        this.api = '/admin/api/gallery'
    }

    loadGallery(){
        api_pull(this.api, data => {
            this.setState(old => {
                return {
                    ...old,
                    data:parseData(data)
                }
            })
        })
    }
    componentDidMount() {
        this.loadGallery()
    }

    onAddClicked() {
        this.togglePopup('add')
    }

    onDeleteClicked(table, row) {
        this.togglePopup('delete')
        this.setState(old => {
            return {
                ...old,
                staged_delete:row
            }
        })
    }

    togglePopup(popup){
        this.setState(old => {
            return {
                ...old,
                pshow:{
                    [popup]:!old.pshow[popup]
                }
            }
        })
    }

    onDeletePopupClose(action) {
        this.togglePopup('delete')
        if(action !== 'confirm')
            return 
        api_push(this.api, {delete:this.state.data[this.state.staged_delete]})
        this.setState(old => {
            let newstate = {...old}
            delete newstate.staged_delete
            return newstate
        })
        this.loadGallery()
    }

    onImageAdded(changed, data){
        this.togglePopup('add')
        if(!changed)
            return

        api_push(this.api, {add:{photo_url:data}})
        this.loadGallery()
    }

    render() {
        return (
            <div id="GalleryContainer" class="container">
                <div className="Gallery">
                    <DeleteItemPopup
                        show = {this.state.pshow.delete}
                        onClose = {this.onDeletePopupClose}
                    />
                    <AddImagePopup 
                        show = {this.state.pshow.add}
                        onClose = {() => this.togglePopup('add')}
                        onAdd = {this.onImageAdded}
                        menu = {this.menu}
                        type = {this.state.type}
                        imgHeight={250}
                    />
                    <Table 
                        heading='Photos'
                        headingButton='Add'
                        onAdd={this.onAddClicked}
                        rowButton="Delete"
                        cssClassName = "TableLeftButton"
                        onRowClick={()=>null}
                        cols = {['ID', 'Image']}
                        data = {this.state.data}
                        onRowButtonClick= {this.onDeleteClicked}
                        img_h="250"
                    />
                </div>
            </div>
        )
    }
}

export default Gallery
