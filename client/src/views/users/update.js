import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="update user">
        <div className="container">

          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/users" className="btn btn-outline-warning">
                Show All Users
              </Link>
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit User</h1>
              <p className="lead text-center">
                Update User's Info
              </p>
            </div>
          </div>
  
          <div className="col-md-8 m-auto">
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
  
              <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update User</button>
              <br />

            </form>
          </div>
  
        </div>
      </div>
    );
  }
}

export default UpdateView;