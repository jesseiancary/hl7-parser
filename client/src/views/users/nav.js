import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/users/new" className={ this.props.active === "/users/new" ? "nav-link active" : "nav-link" }>
            Add New User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className={ this.props.active === "/users" ? "nav-link active" : "nav-link" }>
            All Users
          </Link>
        </li>
      </ul>
    );
  }
}

export default Nav;