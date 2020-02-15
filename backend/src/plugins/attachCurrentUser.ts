'use strict'

import UserModel from '../models/User'

// ERROR CONTROL MIGHT NEED SOME WORK HERE
export default async (req, h) => {

  try {
    if (req.auth.artifacts && req.auth.artifacts.user_id) {
      const user = await UserModel.findById(req.auth.artifacts.user_id)
      if (!user) {
        req.setUrl('/')
      }
      req.currentUser = user
    }
  } catch(err) {
    req.setUrl('/')
  }

  return h.continue
}