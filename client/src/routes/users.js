import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './routes';
import { ShowAllUsers, CreateUser, ShowUser, UpdateUser } from '../controllers/Users';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/users" component={ShowAllUsers} />
    <PrivateRoute exact path="/users/new" component={CreateUser} />
    <PrivateRoute exact path="/users/:id" component={ShowUser} />
    <PrivateRoute path="/users/:id/edit" component={UpdateUser} />
  </Switch>
);

export default Routes;