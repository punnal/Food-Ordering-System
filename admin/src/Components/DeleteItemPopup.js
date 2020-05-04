import React from 'react'
import {Popup, PopupH, PopupBody, PopupButtons} from './Popup'

const DeleteItemPopup = (props) => {
     return(
        <Popup 
            show={props.show}
            onDataChanged={props.onDataChanged}
        >
            <PopupH>Delete Item</PopupH>
            <PopupBody>Are you sure you want to Delete? </PopupBody>
            <PopupButtons>
                <button onClick={()=> props.onClose('cancel')}> Close </button>
                <button onClick={()=> props.onClose('confirm')}> Confirm </button>
            </PopupButtons>
        </Popup>
    )
}

export default DeleteItemPopup
