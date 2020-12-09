import React from 'react'
import Toast from 'react-bootstrap/Toast'

export default function GenericToast(props) {

    return (
        <div

            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative'
            }}
        >
            <Toast
                className="bg-danger text-white"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                onClose={props.onClose}
                show={props.show}
                delay={10000} autohide
            >
                <Toast.Header>
                    <strong className={"mr-auto"}>{props.type}</strong>
                    <small>{props.footer}</small>
                </Toast.Header>
                <Toast.Body>
                    <strong className={"mr-auto"}>
                        {props.message}.
                    <br></br>
                        {props.trazaMsg}
                    </strong>
                </Toast.Body>
            </Toast>
        </div>
    );

}

// LLAMADO
// {/* <Toast
//     show={this.state.alertShow}
//     onClose={this.onAlertClose}
//     type={this.state.alertType}
//     message={this.state.alertMessage}
//     footer={this.state.alertFooter}
//     trazaMsg={this.state.alertTrazaMsg}
// /> */}
