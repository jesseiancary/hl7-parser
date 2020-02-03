import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="create user">
        <div className="container">

          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>

              <form noValidate onSubmit={t.onSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    className='form-control'
                    value={t.state.email}
                    onChange={t.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                    value={t.state.password}
                    onChange={t.onChange}
                  />
                </div>

                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
                <br />
                {t.state.error && <p>{t.state.error}</p>}
              </form>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LoginView;