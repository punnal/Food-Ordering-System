import React from 'react'
import {Popup, PopupH, PopupBody, PopupButtons } from './Popup'

const AddDealPopup = (props) => {
    return (
        <Popup 
            show={props.show}>
            <button onClick={() => props.onClose('cancel')}> Close </button>
        </Popup>
    )
}

export default AddDealPopup
