import React from 'react';
import socket from '../utils/Socket';


function App() {

  socket.emit('conectado', "Hello from client")

  // socket.emit('mensaje', 'jeffrey', 'Hola desde chat')

  const enviar = () =>{
    socket.emit('mensaje', 'jeffrey', 'Hola desde chat')
  }

  socket.on('mensajes', mensaje => {
    alert("desde servidor " + mensaje.mensaje);
  });
  return (
    <div>
      <button className="btn-success btn" onClick={enviar}> enviar a servidor</button>
    </div>
  );
}

export default App;
