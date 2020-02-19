import React, { Component, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import global from '../utils/global.js'
import user from '../models/User.js'
import { AuthContext } from '../utils/auth-context'

import LoginView from '../views/account/login'
import RegisterView from '../views/account/register'
import ProfileView from '../views/account/profile'
import LoginAsView from '../views/account/login-as'

const api = 'http://localhost:3001/api/users'

axios.defaults.withCredentials = true

/*
 * @route /logout
 * @description Log out a user
 */
// export class Logout extends Component {
export const Logout = props => {

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    axios
      .post(`${api}/logout`)
      .then(res => {
        dispatch({
          type: "LOGOUT"
        })
      })
      .catch(err => {
        console.log('Error in Logout.useEffect()', err.response)
      })
      .then(() => {
        props.history.push('/')
      })
  }, [])

  return null

}

/*
 * @route /login
 * @description Log in a user
 */
export const Login = props => {

  const { dispatch } = useContext(AuthContext)

  const initialState = {
    email: '',
    password: '',
    error: null
  }

  const [data, setData] = useState(initialState)

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    const { from } = props.location.state || { from: { pathname: '/' } }
    axios
      .post(`${api}/login`, {
        user: {
          email: data.email,
          password: data.password
        }
      })
      .then(res => {
        if (res.data.user) {
          dispatch({
            type: "LOGIN",
            payload: res.data
          })
          props.history.push(from.pathname)
        } else if (res.data.error) {
          setData({
            ...data,
            error: res.data.error
          })
        } else {
          setData({
            ...data,
            error: 'There was an error logging in.'
          })
        }
      })
      .catch(err => {
        setData({
          ...data,
          error: err.response.data.message
        })
        console.log('Error in Login.onSubmit()', err.response)
      })
  }

  // const t = {
  //   data: data,
  //   onChange: onchange,
  //   onSubmit: onSubmit
  // }
  // console.log('t', t)

  return (
    <LoginView data={data} onChange={onChange} onSubmit={onSubmit} />
  )

}

/*
 * @route /login-as
 * @description Log in admin user as another user
 */
export const LoginAs = props => {

  const { dispatch } = useContext(AuthContext)

  const initialState = {
    email: '',
    error: null
  }

  const [data, setData] = useState(initialState)

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    axios
      .post(`${api}/login-as`, {
        user: {
          email: data.email
        }
      })
      .then(res => {
        if (res.data.user) {
          dispatch({
            type: "LOGIN",
            payload: res.data
          })
          props.history.push('/')
        } else if (res.data.error) {
          setData({
            ...data,
            error: res.data.error
          })
        } else {
          setData({
            ...data,
            error: 'There was an error logging in.'
          })
        }
      })
      .catch(err => {
        setData({
          ...data,
          error: err.response.status === 403 ? 'You do not have permission to log in as another user.' : err.response.data.message
        })
        console.log('Error in LoginAs.onSubmit()', err.response)
      })
  }

  return (
    <LoginAsView data={data} onChange={onChange} onSubmit={onSubmit} />
  )

}

/*
 * @route /register
 * @description Create a user
 */
export const Register = props => {

  const { dispatch } = useContext(AuthContext)

  const initialState = user

  const [data, setData] = useState(initialState)

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    axios
      .post(api, {
        user: data
      })
      .then(res => {
        if (res.data.user) {
          dispatch({
            type: "LOGIN",
            payload: res.data
          })
          props.history.push('/profile')
        } else if (res.data.error) {
          setData({
            ...data,
            error: res.data.error
          })
        } else {
          setData({
            ...data,
            error: 'There was an error registering the user.'
          })
        }
      })
      .catch(err => {
        setData({
          ...data,
          error: 'There was an error registering the user.'
        })
        console.log('Error in Register.onSubmit()', err.response)
      })
  }

  return (
    <RegisterView data={data} onChange={onChange} onSubmit={onSubmit} />
  )

}

/*
 * @route /profile
 * @description Edit a user
 */
export class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = user
    delete this.state.password
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/profile`)
      .then(res => {
        this.setState(global.modelData(user, res.data.user))
        this.setState({ _id: res.data.user._id })
      })
      .catch(err => {
        console.log('Error in Profile.componentDidMount()', err.response)
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .put(`${api}/${this.state._id}`, { user: this.state })
      .then(res => {
        if (res.data.user) {
          localStorage.setItem('user', res.data.user)
          this.setState({ success: 'Profile updated successfully.' })
          this.props.history.push('/profile')
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error updating profile.' })
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error updating profile.' })
        console.log('Error in Profile.onSubmit()', err.response)
      })
  }

  render() {
    return (
      <ProfileView this={this} />
    )
  }

}