'use strict'

import UserController from '../../controllers/User';

exports.plugin = {
  register: (server, options, next) => {
  
    server.route({
      method: 'POST',
      path: '/users',
      handler: UserController.create
    }),
  
    server.route({
      method: 'GET',
      path: '/users',
      handler: UserController.find
    }),
  
    server.route({
      method: 'GET',
      path: '/users/{id}',
      handler: UserController.findOne
    }),
  
    server.route({
      method: 'PUT',
      path: '/users/{id}',
      handler: UserController.update
    }),
  
    server.route({
      method: 'DELETE',
      path: '/users/{id}',
      handler: UserController.delete
    }),
  
    server.route({
      method: 'POST',
      path: '/users/login',
      handler: UserController.login
    }),
  
    server.route({
      method: 'GET',
      path: '/users/{id}/profile',
      handler: UserController.profile
    })

  },
  name: 'users'
}