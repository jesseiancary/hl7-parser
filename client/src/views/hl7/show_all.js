import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShowAllView extends Component {
  render() {
    const t = this.props.this;
    const hl7Documents = t.state.hl7;
    let hl7List;

    if (!hl7Documents) {
      hl7List = <p>There are no hl7 documents!</p>;
    } else {
      hl7List =
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date Imported</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {hl7Documents.map((document, k) =>
              <tr key={document._id}>
                <td>{document._id}</td>
                <td>{document.createdAt}</td>
                <td><Link to={`/hl7/${document._id}`}>View</Link></td>
              </tr>
            )}
          </tbody>
        </table>
    }

    return (
      <div className="show-all hl7-document">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">HL7 Document List</h2>
            </div>
            <div className="col-md-12">
              <Link to="/hl7/new" className="btn btn-outline-warning float-right">
                + Add New HL7 Document
              </Link>
              <br />
            </div>
          </div>
          { hl7List }
        </div>
      </div>
    );

  }
}

export default ShowAllView;