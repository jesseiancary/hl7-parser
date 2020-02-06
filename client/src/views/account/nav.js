import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
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
    );
  }
}

export default Nav;