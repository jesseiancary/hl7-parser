import React, { Component } from 'react'
import axios from 'axios'
import global from '../utils/global.js'
import user from '../models/User.js'

import CreateView from '../views/users/create'
import UpdateView from '../views/users/update'
import ShowView from '../views/users/show'
import ShowAllView from '../views/users/show_all'

const api = 'http://localhost:3001/api/users'

/*
 * @route /users/new
 * @description Create a user
 */
export class CreateUser extends Component {

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
        if (res.data.user) {
          this.props.history.push('/users')
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error registering the user.' })
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error creating the user.' })
        console.log('Error in CreateUser.onSubmit()', err.response)
      })
  }

  render() {
    return (
      <CreateView this={this} />
    )
  }

}

/*
 * @route /users/:id/edit
 * @description Edit a user
 */
export class UpdateUser extends Component {

  constructor(props) {
    super(props)
    this.state = user
    delete this.state.password
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(user, res.data.user))
        this.setState({ _id: this.props.match.params.id })
      })
      .catch(err => {
        console.log('Error in UpdateUser.componentDidMount()', err.response)
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .put(`${api}/${this.props.match.params.id}`, { user: this.state })
      .then(res => {
        if (res.data.user) {
          this.props.history.push(`/users/${this.props.match.params.id}`)
        } else if (res.data.error) {
          this.setState({ error: res.data.error })
        } else {
          this.setState({ error: 'There was an error updating the user.' })
        }
      })
      .catch(err => {
        this.setState({ error: 'There was an error updating the user.' })
        console.log('Error in UpdateUser.onSubmit()', err.response)
      })
  }

  render() {
    return (
      <UpdateView this={this} />
    )
  }

}

/*
 * @route /users/:id
 * @description Display a user
 */
export class ShowUser extends Component {

  constructor(props) {
    super(props)
    this.state = user
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(user, res.data.user))
        this.setState({ _id: this.props.match.params.id })
      })
      .catch(err => {
        console.log('Error in ShowUser.componentDidMount()', err.response)
      })
  }

  onDeleteClick = id => {
    axios
      .delete(`${api}/${id}`)
      .then(res => {
        this.props.history.push('/users')
      })
      .catch(err => {
        console.log('Error in ShowUser.onDeleteClick()', err.response)
      })
  }

  render() {
    return (
      <ShowView this={this} />
    )
  }

}

/*
 * @route /users
 * @description Display all users
 */
export class ShowAllUsers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios
      .get(api)
      .then(res => {
        this.setState({
          users: res.data.users
        })
      })
      .catch(err => {
        console.log('Error in ShowAllUsers.componentDidMount()', err.response)
      })
  }

  render() {
    return (
      <ShowAllView this={this} />
    )
  }

}