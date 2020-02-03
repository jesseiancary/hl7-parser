import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShowView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="show user">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br />
              <Link to="/users" className="btn btn-outline-warning">
                Show All Users
              </Link>
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">User's Record</h1>
              <p className="lead text-center">
                View User's Info
              </p>
            </div>
          </div>
          <div>
            <div>
              <table className="table table-hover table-dark">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>First Name</td>
                    <td>{ t.state.first_name }</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Last Name</td>
                    <td>{ t.state.last_name }</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Email Address</td>
                    <td>{ t.state.email }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={t.onDeleteClick.bind(t, t.state._id)}>
                Delete User
              </button>
              <br />
            </div>
            <div className="col-md-6">
              <Link to={`/users/${t.state._id}/edit`} className="btn btn-outline-info btn-lg btn-block">
                Edit User
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowView;