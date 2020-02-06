import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateView extends Component {
  render() {
    const t = this.props.this;
    return (
      <div className="create hl7-document">
        <div className="container">

          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/hl7" className="btn btn-outline-warning">
                Show All HL7 Documents
              </Link>
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Enter HL7</h1>

              <form noValidate onSubmit={t.onSubmit}>
                <div className="form-group">
                  <textarea
                    name="hl7_data"
                    placeholder="HL7 Data"
                    className="form-control"
                    value={t.state.hl7_data}
                    onChange={t.onChange}
                  />
                </div>

                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
                <br />
              </form>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateView;