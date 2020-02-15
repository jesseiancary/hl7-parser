import React, { Component } from 'react'
import Nav from './nav'

class UpdateView extends Component {
  render() {
    const t = this.props.this
    return (
      <main className="register user">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">

              <Nav active="/register" />

              <div className="jumbotron">

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

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control"
                      value={t.state.email}
                      onChange={t.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={t.state.password}
                      onChange={t.onChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-info btn-lg btn-block mb-2">Register</button>
                  <span className="text-danger">
                    {t.state.error && t.state.error}&nbsp;
                  </span>

                </form>

              </div>

            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default UpdateView