import React, { Component } from 'react';

import './styles/Loader.css';

import loaderGif from '../images/loaderGif.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>

      // <img
      //   className="img-fluid mx-auto d-block" alt="Loader"
      //   src={loaderGif}
      // />

    );
  }
}
