import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Channel from 'components/Channel';
import NoRoute from 'components/NoRoute';

import styles from './App.css';

export default () => (
  <Router>
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={Channel} />
        <Route component={NoRoute} />
      </Switch>
    </div>
  </Router>
);
