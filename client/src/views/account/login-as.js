import React from 'react'
import Nav from './nav'

const LoginAsView = props => (
  <main className="login user">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">

          <Nav active="/login-as" />

          <div className="jumbotron">

            <form noValidate onSubmit={props.onSubmit}>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="form-control"
                  value={props.data.email}
                  onChange={props.onChange}
                />
              </div>

              <button type="submit" className="btn btn-info btn-lg btn-block mb-2">Log In</button>
              <span className="text-danger">
                {props.data.error && props.data.error}&nbsp;
              </span>

            </form>

          </div>

        </div>
      </div>
    </div>
  </main>
)

export default LoginAsView