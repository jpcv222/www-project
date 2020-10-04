import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      < Switch >
        <Route exact path="/" component={Index} />
        <Route exact path="/Home" component={Home} />
        <Route component={NotFound} />
      </Switch >
      </Layout>
    </BrowserRouter >
  );
}

export default App;
