import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './nav'

class ShowView extends Component {
  render() {
    const t = this.props.this
    return (
      <main className="show user">
        <div className="container mt-5">

          <div className="row">
            <div className="col-lg-12">

              <Nav />

              <div className="jumbotron">

                <h1 className="display-3 text-center">User's Record</h1>
                <hr className="my-4" />

                <table className="table table-hover">
                  <tbody>
                    <tr className="table-dark">
                      <td>First Name</td>
                      <td>{ t.state.first_name }</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Last Name</td>
                      <td>{ t.state.last_name }</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Email Address</td>
                      <td>{ t.state.email }</td>
                    </tr>
                  </tbody>
                </table>

              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-lg btn-block" onClick={t.onDeleteClick.bind(t, t.state._id)}>
                Delete User
              </button>
              <br />
            </div>
            <div className="col-md-6">
              <Link to={`/users/${t.state._id}/edit`} className="btn btn-info btn-lg btn-block">
                Edit User
              </Link>
              <br />
            </div>
          </div>
          
        </div>
      </main>
    )
  }
}

export default ShowView