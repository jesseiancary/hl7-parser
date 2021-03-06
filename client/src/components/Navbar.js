import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withAuthProps } from '../utils/auth-context.js'

const NavBar = ({ state }) => {

  const loggedOut = (
    <div className="dropdown-menu dropdown-menu-right">
      <Link to="/login" className="dropdown-item">
        <i className="fas fa-sign-in-alt fa-fw"></i> Login
      </Link>
      <Link to="/register" className="dropdown-item">
        <i className="fas fa-user-plus fa-fw"></i> Register
      </Link>
    </div>
  )

  const loggedIn = (
    <div className="dropdown-menu dropdown-menu-right">
      <Link to="/profile" className="dropdown-item">
        <i className="fas fa-user-edit fa-fw"></i> Profile
      </Link>
      <a href="/logout" className="dropdown-item">
        <i className="fas fa-sign-out-alt fa-fw"></i> Logout
      </a>
      { state.user && state.user.scope.indexOf('admin') !== -1 &&
        <Link to="/login-as" className="dropdown-item">
          <i className="fas fa-sign-in-alt fa-fw"></i> Login As
        </Link>
      }
    </div>
  )

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hl7/new" className="nav-link">
                HL7
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                { state.isAuthenticated &&
                  <span className="mr-3">{ state.user.email }</span>
                }
                <i className="fas fa-user"></i>
              </a>
              { state.isAuthenticated ? loggedIn : loggedOut }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

}

export default withAuthProps(withRouter(NavBar))