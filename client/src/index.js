import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';



import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/mdbreact';
// import 'mdbreact/dist/mdbreact.esm';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';

import App from './components/App';

const container = document.getElementById('root');

ReactDOM.render(<App />, container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
