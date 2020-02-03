import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShowView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="show hl7">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br />
              <Link to="/hl7" className="btn btn-outline-warning">
                Show All HL7 Documents
              </Link>
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">HL7 Document</h1>
            </div>
          </div>
          <pre className="hl7-data bg-dark text-light">
            { t.state.hl7_data }
          </pre>
          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={t.onDeleteClick.bind(t, t.state._id)}>
                Delete HL7 Document
              </button>
              <br />
            </div>
            <div className="col-md-6">
              <Link to={`/hl7/${t.state._id}/edit`} className="btn btn-outline-info btn-lg btn-block">
                Edit HL7 Document
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowView;