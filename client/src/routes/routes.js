import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Landing from '../components/Landing'

import AccountRoutes from './accounts'
import UserRoutes from './users'
import Hl7Routes from './hl7'

import { createBrowserHistory } from "history"
const history = createBrowserHistory()

// const AuthMessage = withRouter(({ history }) => (
//   localStorage.user !== undefined ? (
//     <p>You are logged in.</p>
//   ) : (
//     <p>You are not logged in.</p>
//   )
// ))

export const Routes = () => (
  <Router history={history}>

    <Navbar />
    {/* <AuthMessage/> */}

    <Route exact path="/" component={Landing} />
    <AccountRoutes />
    <UserRoutes />
    <Hl7Routes />

  </Router>
)

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.user !== undefined
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)