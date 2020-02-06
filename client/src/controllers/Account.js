import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import global from '../utils/global.js';
import user from '../models/User.js';

import LoginView from '../views/account/login';
import RegisterView from '../views/account/register';
import ProfileView from '../views/account/profile';

const api = 'http://localhost:3001/api/users';

/*
 * @route /login
 * @description Log in a user
 */
export class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    axios
      .post(`${api}/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('usertoken', res.data.token);
          this.props.history.push(from.pathname);
        } else if (res.data.error) {
          this.setState({ error: res.data.error });
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error logging in.' });
        console.log('Error in Login.onSubmit()', err);
      });
  };

  render() {
    return (
      <LoginView this={this} />
    );
  }

}

/*
 * @route /register
 * @description Create a user
 */
export class Register extends Component {

  constructor() {
    super();
    this.state = user;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post(api, this.state)
      .then(res => {
        this.props.history.push('/login');
      })
      .catch(err => {
        this.setState({ error: 'There was an error registering the user.' });
        console.log('Error in Register.onSubmit()', err);
      });
  };

  render() {
    return (
      <RegisterView this={this} />
    );
  }

}

/*
 * @route /profile
 * @description Edit a user
 */
export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = user;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const decoded = jwt_decode(localStorage.usertoken);
    axios
      .get(`${api}/${decoded.id}`)
      .then(res => {
        this.setState(global.modelData(user, res.data));
        this.setState({ _id: this.props.match.params.id });
      })
      .catch(err => {
        console.log('Error in Profile.componentDidMount()', err);
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const decoded = jwt_decode(localStorage.usertoken);
    axios
      .put(`${api}/${decoded.id}`, this.state)
      .then(res => {
        this.setState({ success: 'Profile updated successfully.' });
        this.props.history.push('/profile');
      })
      .catch(err => {
        this.setState({ error: 'There was an error updating profile.' });
        console.log('Error in Profile.onSubmit()', err);
      })
  };

  render() {
    return (
      <ProfileView this={this} />
    );
  }

}