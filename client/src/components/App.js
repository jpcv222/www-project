import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import UserManagement from '../pages/UserManagement';
import Chat from '../pages/ChatContainer2';
// import Chat from '../pages/ChatContainer';
import MyProfile from '../pages/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      < Switch >
        <Route exact path="/" component={Index} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/UserManagement" component={UserManagement} />
        <Route exact path="/Chat" component={Chat} />
        <Route exact path="/MyProfile" component={MyProfile} />
        <Route component={NotFound} />
      </Switch >
      </Layout>
    </BrowserRouter >
  );
}

export default App;
