import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Landing from './components/Landing';

import { Register } from './controllers/Account';
import { Login } from './controllers/Account';
import { Profile } from './controllers/Account';

import { ShowAllUsers } from './controllers/Users';
import { CreateUser } from './controllers/Users';
import { ShowUser } from './controllers/Users';
import { UpdateUser } from './controllers/Users';

import { ShowAllHL7Documents } from './controllers/HL7';
import { CreateHL7Document } from './controllers/HL7';
import { ShowHL7Document } from './controllers/HL7';
import { UpdateHL7Document } from './controllers/HL7';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.usertoken !== undefined
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthMessage = withRouter(({ history }) => (
  localStorage.usertoken !== undefined ? (
    <p>You are logged in.</p>
  ) : (
    <p>You are not logged in.</p>
  )
));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">

            <Navbar />
            <AuthMessage/>
            <br />

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
            </Switch>

            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/users/new" component={CreateUser} />
              <PrivateRoute exact path="/users" component={ShowAllUsers} />
              <PrivateRoute exact path="/users/:id" component={ShowUser} />
              <PrivateRoute path="/users/:id/edit" component={UpdateUser} />
            </Switch>

            <Switch>
              <Route exact path="/hl7" component={ShowAllHL7Documents} />
              <Route exact path="/hl7/new" component={CreateHL7Document} />
              <Route exact path="/hl7/:id" component={ShowHL7Document} />
              <Route path="/hl7/:id/edit" component={UpdateHL7Document} />
            </Switch>

            <br />
          </header>
        </Router>
      </div>
    );
  }
}

export default App;