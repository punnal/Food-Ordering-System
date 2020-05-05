import React from 'react'
import {Popup, PopupH, PopupBody, PopupButtons} from './Popup'

const DeleteItemPopup = (props) => {
     return(
        <Popup 
            show={props.show}
            onDataChanged={props.onDataChanged}
        >
            <PopupH><div id="DeletePopupHeading">Delete Item</div></PopupH>
            <PopupBody><div id="DeletePopupBody">Are you sure you want to Delete?</div></PopupBody>
            <PopupButtons>
                <div id="PopupButtons">
                    <button id="DeletePopupCancel" type="button" class="btn btn-danger" onClick={()=> props.onClose('cancel')}> Close </button>
                    <button id="DeletePopupConfirm" type="button" class="btn btn-success" onClick={()=> props.onClose('confirm')}> Confirm </button>
                </div>
            </PopupButtons>
        </Popup>
    )
}

export default DeleteItemPopup
