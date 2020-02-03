import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="create user">
        <div className="container">

          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>

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

                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
                <br />

              </form>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateView;