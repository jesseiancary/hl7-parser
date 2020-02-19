import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/hl7/new" className={ this.props.active === "/hl7/new" ? "nav-link active" : "nav-link" }>
            Parse New HL7 Document
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/hl7" className={ this.props.active === "/hl7" ? "nav-link active" : "nav-link" }>
            My HL7 Documents
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">About HL7</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="https://www.hl7.org/" target="_blank" rel="noopener noreferrer">HL7.org</a>
            {/* <div className="dropdown-divider"></div> */}
            <a className="dropdown-item" href="https://en.wikipedia.org/wiki/Health_Level_7" target="_blank" rel="noopener noreferrer">Wikipedia Page</a>
            <a className="dropdown-item" href="http://hl7-definition.caristix.com:9010/" target="_blank" rel="noopener noreferrer">Data Types</a>
          </div>
        </li>
      </ul>
    )
  }
}

export default Nav