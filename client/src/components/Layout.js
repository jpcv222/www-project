import React, { useState, useEffect } from 'react';

import Header from './Header';
// import Carousel from './Carousel'

// import socket from '../utils/Socket'
// import resources_controller from '../resources/resources_controller'
// import validations from '../resources/validations/main'

function Layout(props) {
  // const [mensajeActual, setMensajeActual] = useState({});
  // const [rowidUsuarioActivo, setRowidUsuarioActivo] = useState(0);

  // useEffect(() => {
  //   if (!resources_controller.FieldIsBlank2(resources_controller.GetSession("row_id"))) {

  //     setRowidUsuarioActivo(parseInt(resources_controller.GetSession("row_id")))
  //     socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })
  //   }
  // }, !resources_controller.FieldIsBlank2(rowidUsuarioActivo) ? [] : rowidUsuarioActivo )

  // useEffect(() => {
  //   socket.on('privateMessage', (data) => {
  //     setMensajeActual(data)
  //     validations.InfoToast(data.transmitter_name + ": " + data.content);
  //   });
  //   return () => { socket.off() }
  // }, [mensajeActual])


  return (
    <React.Fragment>
      <Header />
      {/* <Carousel /> */}
      <div className="container-fluit tracking_content">
        <div className="p-5">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
