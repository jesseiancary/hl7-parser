import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShowAllView extends Component {
  render() {
    const t = this.props.this;
    const users = t.state.users;
    let usersList;

    if (!users) {
      usersList = <p>There are no users!</p>;
    } else {
      usersList =
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Address</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, k) =>
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td><Link to={`/users/${user._id}`}>View</Link></td>
              </tr>
            )}
          </tbody>
        </table>
    }

    return (
      <div className="show-all user">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">User List</h2>
            </div>
            <div className="col-md-12">
              <Link to="/users/new" className="btn btn-outline-warning float-right">
                + Add New User
              </Link>
            </div>
          </div>
          { usersList }
        </div>
      </div>
    );
  }
}

export default ShowAllView;