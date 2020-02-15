import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './nav'

class ShowAllView extends Component {
  render() {
    const t = this.props.this
    const users = t.state.users
    let usersList

    if (!users) {
      usersList = <p>There are no users!</p>
    } else {
      usersList =
        <table className="table table-hover">
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
              <tr className="table-dark" key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    }

    return (
      <main className="show-all users">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">

              <Nav active="/users" />

              <div className="jumbotron">

                <h1 className="display-3 text-center">Users</h1>
                <hr className="my-4" />

                { usersList }

              </div>

            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ShowAllView