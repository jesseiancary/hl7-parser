import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import global from '../utils/global.js'
import user from '../models/User.js'

import LoginView from '../views/account/login'
import RegisterView from '../views/account/register'
import ProfileView from '../views/account/profile'
import LoginAsView from '../views/account/login-as'

const api = 'http://localhost:3001/api/users'

if (localStorage.usertoken !== undefined) axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.usertoken}`

/*
 * @route /login
 * @description Log in a user
 */
export class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    axios
      .post(`${api}/login`, {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('usertoken', res.data.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
          this.props.history.push(from.pathname)
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error logging in.' })
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error logging in.' })
        console.log('Error in Login.onSubmit()', err)
      })
  }

  render() {
    return (
      <LoginView this={this} />
    )
  }

}

/*
 * @route /login
 * @description Log in a user
 */
export class LoginAs extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .post(`${api}/login-as`, {
        user: {
          email: this.state.email
        }
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('usertoken', res.data.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
          this.props.history.push('/')
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error logging in.' })
        }
      })
      .catch(err => {
        this.setState({ error: err.response.status === 403 ? 'You do not have permission to log in as another user.' : err.response.data.message })
        console.log('Error in LoginAs.onSubmit()', err)
      })
  }

  render() {
    return (
      <LoginAsView this={this} />
    )
  }

}

/*
 * @route /register
 * @description Create a user
 */
export class Register extends Component {

  constructor() {
    super()
    this.state = user
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .post(api, { user: this.state })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('usertoken', res.data.token)
          this.props.history.push('/profile')
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error registering the user.' })
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error registering the user.' })
        console.log('Error in Register.onSubmit()', err)
      })
  }

  render() {
    return (
      <RegisterView this={this} />
    )
  }

}

/*
 * @route /profile
 * @description Edit a user
 */
export class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = user
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/profile`)
      .then(res => {
        this.setState(global.modelData(user, res.data.user))
        this.setState({ _id: this.props.match.params.id })
      })
      .catch(err => {
        console.log('Error in Profile.componentDidMount()', err)
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const decoded = jwt_decode(localStorage.usertoken)
    axios
      .put(`${api}/${decoded.id}`, { user: this.state })
      .then(res => {
        this.setState({ success: 'Profile updated successfully.' })
        this.props.history.push('/profile')
      })
      .catch(err => {
        this.setState({ error: 'There was an error updating profile.' })
        console.log('Error in Profile.onSubmit()', err)
      })
  }

  render() {
    return (
      <ProfileView this={this} />
    )
  }

}