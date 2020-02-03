import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
  
    const loggedOut = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/users/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users/new" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const loggedIn = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hl7/new" className="nav-link">
                HL7 Parser
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? loggedIn : loggedOut}
        </div>
      </nav>
    );

  }
}

export default withRouter(Landing)
