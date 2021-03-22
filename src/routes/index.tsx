import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import User from '../pages/User';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/users" component={Users} />
    <Route path="/user/:user" component={User} />
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
