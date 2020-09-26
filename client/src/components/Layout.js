import React from 'react';

import Header from './Header';

function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <div className="container-fluit tracking_content">
        <div className="p-5">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
