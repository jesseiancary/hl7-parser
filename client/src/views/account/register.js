import React from 'react'
import Nav from './nav'

const UpdateView = props => (
  <main className="register user">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">

          <Nav active="/register" />

          <div className="jumbotron">

            <form noValidate onSubmit={props.onSubmit}>

              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="form-control"
                  value={props.data.first_name}
                  onChange={props.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  value={props.data.last_name}
                  onChange={props.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                  value={props.data.email}
                  onChange={props.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={props.data.password}
                  onChange={props.onChange}
                />
              </div>

              <button type="submit" className="btn btn-info btn-lg btn-block mb-2">Register</button>
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

export default UpdateView