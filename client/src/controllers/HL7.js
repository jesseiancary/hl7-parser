import React, { Component } from 'react'
import axios from 'axios'
import global from '../utils/global.js'
import hl7 from '../models/HL7.js'

import CreateView from '../views/hl7/create'
import UpdateView from '../views/hl7/update'
import ShowView from '../views/hl7/show'
import ShowAllView from '../views/hl7/show_all'

const api = 'http://localhost:3001/api/hl7'

/*
 * @route /hl7/new
 * @description Create a hl7
 */
export class CreateHL7Document extends Component {

  constructor() {
    super()
    this.state = hl7
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .post(api, this.state)
      .then(res => {
        if (res.data._id) {
          this.props.history.push(`/hl7/${res.data._id}`)
        } else {
          this.props.history.push('/hl7')
        }
      })
      .catch(err => {
        console.log('Error in CreateHL7.onSubmit()', err.response)
      })
  }

  render() {
    return (
      <CreateView this={this} />
    )
  }

}

/*
 * @route /hl7/:id/edit
 * @description Edit a hl7
 */
export class UpdateHL7Document extends Component {

  constructor(props) {
    super(props)
    this.state = hl7
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(hl7, res.data))
        this.setState({ _id: this.props.match.params.id })
      })
      .catch(err => {
        console.log('Error in UpdateHL7.componentDidMount()', err.response)
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .put(`${api}/${this.props.match.params.id}`, this.state)
      .then(res => {
        this.props.history.push(`/hl7/${this.props.match.params.id}`)
      })
      .catch(err => {
        console.log('Error in UpdateHL7.onSubmit()', err.response)
      })
  }

  render() {
    return (
      <UpdateView this={this} />
    )
  }

}

/*
 * @route /hl7/:id
 * @description Display a hl7
 */
export class ShowHL7Document extends Component {

  constructor(props) {
    super(props)
    this.state = hl7
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(global.modelData(hl7, res.data))
        this.setState({ _id: this.props.match.params.id })
      })
      .catch(err => {
        console.log('Error in ShowHL7.componentDidMount()', err.response)
      })
  }

  onDeleteClick = id => {
    axios
      .delete(`${api}/${id}`)
      .then(res => {
        this.props.history.push('/hl7')
      })
      .catch(err => {
        console.log('Error in ShowHL7.onDeleteClick()', err.response)
      })
  }

  render() {
    return (
      <ShowView this={this} />
    )
  }

}

/*
 * @route /hl7
 * @description Display all hl7
 */
export class ShowAllHL7Documents extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hl7: []
    }
  }

  componentDidMount() {
    axios
      .get(api)
      .then(res => {
        this.setState({
          hl7: res.data
        })
      })
      .catch(err => {
        console.log('Error in ShowAllHL7Documents.componentDidMount()', err.response)
      })
  }

  render() {
    return (
      <ShowAllView this={this} />
    )
  }

}