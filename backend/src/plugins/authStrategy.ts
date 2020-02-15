'use strict'

import * as jwt from 'jsonwebtoken'
import * as Promise from 'bluebird'

process.env.SECRET_KEY = 'MySuP3R_z3kr3t.' // @TODO move this to an env var

const AuthStrategy = {
  validate: async (req, token, h) => {
    return Promise.try(() => jwt.verify(token, process.env.SECRET_KEY))
    .then(decoded => {
      return { isValid: true, credentials: { token }, artifacts: { user_id: decoded.data.id } }
    })
    .catch(err => {
      return { isValid: false, credentials: {}, artifacts: { error: err } }
    })
  }
}

export default AuthStrategy