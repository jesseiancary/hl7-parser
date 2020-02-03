import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect,    Link, withRouter } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Landing from './components/Landing';

import { LoginUser } from './controllers/Users';
import { ShowAllUsers } from './controllers/Users';
import { CreateUser } from './controllers/Users';
import { ShowUser } from './controllers/Users';
import { UpdateUser } from './controllers/Users';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.usertoken !== undefined
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/users/login',
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
              <Route exact path="/" component={Landing} />
              <Route exact path='/users/new' component={CreateUser} />
              <Route exact path="/users/login" component={LoginUser} />
              <PrivateRoute exact path='/users' component={ShowAllUsers} />
              <PrivateRoute exact path='/users/:id' component={ShowUser} />
              <PrivateRoute path='/users/:id/edit' component={UpdateUser} />
            </Switch>

            <br />
          </header>
        </Router>
      </div>
    );
  }
}

export default App;