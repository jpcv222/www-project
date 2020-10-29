import React from 'react'
import './styles/Alert.css'
import AlertComponent from 'react-bootstrap/Alert'

export default function Alert(props) {

    if (props.show) {
        return (
            <div className="container alert_container">
                <AlertComponent variant={props.type} onClose={props.onClose} dismissible delay={5000} autohide>
                        {props.message}
                    {props.showFooter &&
                        <React.Fragment>
                            <hr></hr>
                            <p className="mb-0 text-center">
                                {props.footer} {" "} {props.trazaMsg}
                            </p>
                        </React.Fragment>
                    }
                </AlertComponent>
            </div>
        );
    }
    return null;
// LLAMADO
//     <Alert
//     show={this.state.alertShow}
//     onClose={this.onAlertClose}
//     type={this.state.alertType}
//     message={this.state.alertMessage}
//     footer={this.state.alertFooter}
//     trazaMsg={this.state.alertTrazaMsg}
//     showFooter={this.state.showAlertFooter}
// />
}
