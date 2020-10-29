import React from 'react';

import Header from './Header';
// import Carousel from './Carousel'

function Layout(props) {
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
