import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="update person">
        <div className="container">

          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/people" className="btn btn-outline-warning">
                Show All People
              </Link>
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Person</h1>
              <p className="lead text-center">
                Update Person's Info
              </p>
            </div>
          </div>
  
          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={t.onSubmit}>

              <div className='form-group'>
                <input
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  className='form-control'
                  value={t.state.first_name}
                  onChange={t.onChange}
                />
              </div>
  
              <div className='form-group'>
                <input
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  className='form-control'
                  value={t.state.last_name}
                  onChange={t.onChange}
                />
              </div>
  
              <div className='form-group'>
                <input
                  type='date'
                  name='dob'
                  placeholder='Date of Birth'
                  className='form-control'
                  value={t.state.dob}
                  onChange={t.onChange}
                />
              </div>
  
              <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Person</button>
              <br />

            </form>
          </div>
  
        </div>
      </div>
    );
  }
}

export default UpdateView;