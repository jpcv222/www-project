import React from 'react'
import './styles/Alert.css'
import AlertComponent from 'react-bootstrap/Alert'

export default function Alert(props) {

    if (props.alertShow) {
        return (
            <div className="container alert_container">
                <AlertComponent variant={props.alertMode} onClose={props.onAlertClose} dismissible>
                        {props.alertMessage}
                    {props.alertFooterFlag &&
                        <React.Fragment>
                            <hr></hr>
                            <p className="mb-0 text-center">
                                {props.alertFooter} {" "} {props.alertTrazaMsg}
                            </p>
                        </React.Fragment>
                    }
                </AlertComponent>
            </div>
        );
    }
    return null;
}
