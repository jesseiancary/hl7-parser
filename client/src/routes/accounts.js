import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './routes'
import { Register, Login, Profile } from '../controllers/Account'

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/profile" component={Profile} />
  </Switch>
)

export default Routes