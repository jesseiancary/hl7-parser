'use strict'

import * as jwt from 'jsonwebtoken'
import * as Promise from 'bluebird'
import UserModel from '../models/User'

process.env.SECRET_KEY = 'MySuP3R_z3kr3t.' // @TODO move this to an env var

const AuthStrategy = {
  validate: async (req, token, h) => {
    return Promise.try(() => jwt.verify(token, process.env.SECRET_KEY))
    .then(decoded => {
      return UserModel.findById(decoded.data.id)
      .then(user => {
        const credentials = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          scope: user.scope
        }
        return { isValid: true, credentials: credentials, artifacts: { user_id: decoded.data.id } }
      })
      .catch(err => {
        return { isValid: false, credentials: {}, artifacts: { error: err.message } }
      })
    })
    .catch(err => {
      return { isValid: false, credentials: {}, artifacts: { error: err.message } }
    })
  }
}

export default AuthStrategy