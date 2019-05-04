import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './views/App';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/:section?" render={routerProps => <App {...routerProps} />} />
    </Switch>
  </Router>
);
