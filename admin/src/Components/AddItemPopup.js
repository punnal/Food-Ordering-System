import React from 'react'
import AddItemForm from './AddItemForm'
import {Popup, PopupH, PopupBody, PopupButtons } from './Popup'

const AddItemPopup = (props) =>{
    return (
        <Popup 
            show={props.show}
        >
            <PopupH><div id="AddItemPopupHeading">Add an item</div></PopupH>
            <PopupBody>
                <AddItemForm 
                    onPopupClose={props.onClose}
                    prefill={props.prefill}/>
                </PopupBody>
            </Popup>

    )
}

export default AddItemPopup
