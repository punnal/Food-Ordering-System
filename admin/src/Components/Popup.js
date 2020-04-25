import React from 'react'
import { res } from '../res/res'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
function Popup(props) {
    return (
            <button style={{'visibility':(props.show)?'visible':'hidden'}} onClick={props.onHide}>HASSAN</button>
    );
}

export default Popup
