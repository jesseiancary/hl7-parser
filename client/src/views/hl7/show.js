import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './nav'

class ShowView extends Component {
  render() {
    const t = this.props.this
    return (
      <main className="show hl7">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">

              <Nav />

              <div className="jumbotron">

                <h1 className="display-3 text-center">HL7 Document</h1>
                <hr className="my-4" />

                <pre className="hl7-data bg-dark text-light">
                  { t.state.hl7_data }
                </pre>
                <pre className="hl7-data bg-dark text-light">
                  { JSON.stringify(t.state.json_data, null, 2) }
                </pre>
                <div className="text-right">
                  <button type="button" className="btn btn-danger btn-lg" onClick={t.onDeleteClick.bind(t, t.state._id)}>
                    Delete HL7 Document
                  </button>
                  <Link to={`/hl7/${t.state._id}/edit`} className="btn btn-info btn-lg ml-1">
                    Edit HL7 Document
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ShowView