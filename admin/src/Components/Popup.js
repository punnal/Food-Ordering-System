import React from 'react'
import { res } from '../res/res'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
function Popup(props) {
    return (
        <Modal
            {...props}
                size="lg"
                dialogClassName={'PopUP'}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        FIX THIS FUCKING POPUP HASSAN
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default Popup
