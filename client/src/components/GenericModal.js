import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default function GenericModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {/* <Modal.Footer>
                <button className="btn btn-danger" onClick={props.onHide}>Cerrar</button>
            </Modal.Footer> */}
        </Modal>
    )
}
