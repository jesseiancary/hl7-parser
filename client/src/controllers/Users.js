import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import global from '../utils/global.js';
import user from '../models/User.js';

import LoginView from '../views/users/login';
import CreateView from '../views/users/create';
import UpdateView from '../views/users/update';
import ShowView from '../views/users/show';
import ShowAllView from '../views/users/show_all';

const api = 'http://localhost:3001/api/users';

/*
 * @route /users/login
 * @description Log in a user
 */
export class LoginUser extends Component {

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
        console.log('Error in LoginUser.onSubmit()', err);
      });
  };

  render() {
    return (
      <LoginView this={this} />
    );
  }

}

/*
 * @route /users/new
 * @description Create a user
 */
export class CreateUser extends Component {

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
        this.props.history.push('/users/login');
      })
      .catch(err => {
        console.log('Error in CreateUser.onSubmit()', err);
      });
  };

  render() {
    return (
      <CreateView this={this} />
    );
  }

}

/*
 * @route /users/:id/edit
 * @description Edit a user
 */
export class UpdateUser extends Component {

  constructor(props) {
    super(props);
    this.state = user;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(user, res.data));
        this.setState({ _id: this.props.match.params.id });
      })
      .catch(err => {
        console.log('Error in UpdateUser.componentDidMount()', err);
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .put(`${api}/${this.props.match.params.id}`, this.state)
      .then(res => {
        this.props.history.push(`/users/${this.props.match.params.id}`);
      })
      .catch(err => {
        console.log('Error in UpdateUser.onSubmit()', err);
      })
  };

  render() {
    return (
      <UpdateView this={this} />
    );
  }

}

/*
 * @route /users/:id
 * @description Display a user
 */
export class ShowUser extends Component {

  constructor(props) {
    super(props);
    this.state = user;
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    // const token = localStorage.usertoken;
    // const decoded = jwt_decode(token);
    // this.setState({
    //   first_name: decoded.first_name,
    //   last_name: decoded.last_name,
    //   email: decoded.email
    // });
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(user, res.data));
        this.setState({ _id: this.props.match.params.id });
      })
      .catch(err => {
        console.log('Error in ShowUser.componentDidMount()', err);
      })
  };

  onDeleteClick = id => {
    axios
      .delete(`${api}/${id}`)
      .then(res => {
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('Error in ShowUser.onDeleteClick()', err);
      })
  };

  render() {
    return (
      <ShowView this={this} />
    );
  }

}

/*
 * @route /users
 * @description Display all users
 */
export class ShowAllUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get(api)
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log('Error in ShowAllUsers.componentDidMount()', err);
      })
  };

  render() {
    return (
      <ShowAllView this={this} />
    );
  }

}