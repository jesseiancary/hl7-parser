'use strict'

import UserController from '../../controllers/User';
const User = new UserController();

exports.plugin = {
  register: (server, options, next) => {
  
    server.route({
      method: 'POST',
      path: '/users',
      handler: User.create
    }),
  
    server.route({
      method: 'GET',
      path: '/users',
      handler: User.find
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
      handler: User.delete
    }),
  
    server.route({
      method: 'POST',
      path: '/users/login',
      handler: User.login
    }),
  
    server.route({
      method: 'GET',
      path: '/users/{id}/profile',
      handler: User.profile
    })

  },
  name: 'users'
}