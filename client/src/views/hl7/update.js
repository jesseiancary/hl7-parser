import React, { Component } from 'react'
import Nav from './nav'

class UpdateView extends Component {
  render() {
    const t = this.props.this
    return (
      <main className="update hl7-document">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">

              <Nav />

              <div className="jumbotron">

                <h1 className="display-3 text-center">Edit HL7</h1>
                <hr className="my-4" />

                <div className="alert alert-dismissible alert-danger mb-5">
                  <button type="button" className="close" data-dismiss="alert">×</button>
                  <h4 className="alert-heading">Warning!</h4>
                  <p className="mb-0">This app is not HIPPA compliant, REMOVE/REPLACE ANY SENSITIVE PATIENT IDENTIFIABLE INFORMATION LIKE Name, Address, Email, Phone, etc. For more information regarding HIPPA compliance and regulations, <a href="https://www.hhs.gov/hipaa/index.html" target="_blank" rel="noopener noreferrer">click here</a>.</p>
                </div>

                <form noValidate onSubmit={t.onSubmit}>

                  <div className="form-group">
                    <textarea
                      rows="15"
                      name="hl7_data"
                      placeholder="HL7 Data"
                      className="form-control"
                      value={t.state.hl7_data}
                      onChange={t.onChange}
                    />
                  </div>
                  <div className="text-right">
                    <button type="submit" className="btn btn-info btn-lg">Update HL7</button>
                  </div>

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