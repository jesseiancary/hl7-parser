import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <div>
        { this.props.active === "/login-as" ?
          <ul className="nav nav-pills">
            <Link to="/login-as" className="nav-link active">
              Log In As Another User
            </Link>
          </ul>
        :
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/login" className={ this.props.active === "/login" ? "nav-link active" : "nav-link" }>
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className={ this.props.active === "/register" ? "nav-link active" : "nav-link" }>
                Register
              </Link>
            </li>
          </ul>
        }
      </div>
    )
  }
}

export default Nav