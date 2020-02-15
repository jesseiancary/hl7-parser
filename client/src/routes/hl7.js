import React from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from './routes'
import { ShowAllHL7Documents, CreateHL7Document, ShowHL7Document, UpdateHL7Document } from '../controllers/HL7'

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/hl7" component={ShowAllHL7Documents} />
    <PrivateRoute exact path="/hl7/new" component={CreateHL7Document} />
    <PrivateRoute exact path="/hl7/:id" component={ShowHL7Document} />
    <PrivateRoute path="/hl7/:id/edit" component={UpdateHL7Document} />
  </Switch>
)

export default Routes