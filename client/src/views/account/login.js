import React, { Component } from 'react';
import Nav from './nav';

class LoginView extends Component {
  render() {
    const t = this.props.this;
    return (
      <main className="login user">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">

              <Nav active="/login" />

              <div className="jumbotron">

                <form noValidate onSubmit={t.onSubmit}>

                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={t.state.email}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      value={t.state.password}
                      onChange={t.onChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-info btn-lg btn-block mb-2">Log In</button>
                  <span className="text-danger">
                    {t.state.error && t.state.error}&nbsp;
                  </span>

                </form>

              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default LoginView;