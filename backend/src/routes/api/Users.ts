'use strict'

import UserController from '../../controllers/User'
const User = new UserController()

exports.plugin = {
  register: (server, options, next) => {
  
    server.route({
      method: 'POST',
      path: '/users',
      handler: User.create,
      options: {
        auth: false
      }
    }),
  
    server.route({
      method: 'GET',
      path: '/users',
      config: {
        auth: {
          scope: ['admin']
        },
        handler: User.find
      }
    }),
  
    server.route({
      method: 'GET',
      path: '/users/{id}',
      handler: User.findOne
    }),
  
    server.route({
      method: 'PUT',
      path: '/users/{id}',
      handler: User.update
    }),
  
    server.route({
      method: 'DELETE',
      path: '/users/{id}',
      config: {
        auth: {
          scope: ['admin']
        },
        handler: User.delete
      }
    }),
  
    server.route({
      method: 'POST',
      path: '/users/login',
      handler: User.login,
      options: {
        auth: false
      }
    }),
  
    server.route({
      method: 'POST',
      path: '/users/login-as',
      config: {
        auth: {
          scope: ['admin']
        },
        handler: User.loginAs
      }
    }),
  
    server.route({
      method: 'GET',
      path: '/users/profile',
      handler: User.profile
    })

  },
  name: 'users'
}