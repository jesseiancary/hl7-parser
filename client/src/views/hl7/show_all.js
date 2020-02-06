import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';

class ShowAllView extends Component {
  render() {
    const t = this.props.this;
    const hl7Documents = t.state.hl7;
    let hl7List;

    if (!hl7Documents) {
      hl7List = <p>There are no hl7 documents!</p>;
    } else {
      hl7List =
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date Imported</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {hl7Documents.map((document, k) =>
              <tr className="table-dark" key={document._id}>
                <td>{document._id}</td>
                <td>{document.createdAt}</td>
                <td>
                  <Link to={`/hl7/${document._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    }

    return (
      <main className="show-all hl7-document">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">

              <Nav active="/hl7" />

              <div className="jumbotron">

                <h1 className="display-3 text-center">HL7 Documents</h1>
                <hr className="my-4" />

                { hl7List }

              </div>

            </div>
          </div>
        </div>
      </main>
    );

  }
}

export default ShowAllView;