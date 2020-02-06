import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';

class UpdateView extends Component {
  render() {
    const t = this.props.this;
    return (
      <main className="update user">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">

              <Nav />

              <div className="jumbotron">

                <h1 className="display-3 text-center">Edit User</h1>
                <hr className="my-4" />

                <form noValidate onSubmit={t.onSubmit}>

                  <div className="form-group">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                      value={t.state.first_name}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                      value={t.state.last_name}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email Address'
                      className='form-control'
                      value={t.state.email}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      className='form-control'
                      value={t.state.password}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className="text-right">
                    <button type="submit" className="btn btn-info btn-lg mb-2">Update</button>
                  </div>
                  <div className="text-right">
                    <span className="text-danger">
                      &nbsp;{t.state.error && t.state.error}
                    </span>
                  </div>

                </form>

              </div>
  
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default UpdateView;