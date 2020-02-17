'use strict'

process.env.SECRET_KEY = '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6' // @TODO move this to an env var

const CookieAuthStrategy = {

  cookie: {
    name: 'authentication',
    password: process.env.SECRET_KEY,
    isSecure: false,              // Set to true for use over HTTPS
    ttl: 3 * 24 * 60 * 60 * 1000, // One day
    path: '/'
  },

  // redirectTo: '/',

  validateFunc: async (req, session) => {

    const cached = await req.server.app.cache.get(session.sid)
    const out = {
      valid: !!cached,
      credentials: {}
    }

    if (out.valid) {
      out.credentials = cached.user
    }

    return out
  }

}

export default CookieAuthStrategy