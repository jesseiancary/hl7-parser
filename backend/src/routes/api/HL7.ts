'use strict'

import HL7Controller from '../../controllers/HL7';

exports.plugin = {
  register: (server, options, next) => {
  
    server.route({
      method: 'POST',
      path: '/hl7',
      handler: HL7Controller.create
    }),
  
    server.route({
      method: 'GET',
      path: '/hl7',
      handler: HL7Controller.find
    }),
  
    server.route({
      method: 'GET',
      path: '/hl7/{id}',
      handler: HL7Controller.findOne
    }),
  
    server.route({
      method: 'PUT',
      path: '/hl7/{id}',
      handler: HL7Controller.update
    }),
  
    server.route({
      method: 'DELETE',
      path: '/hl7/{id}',
      handler: HL7Controller.delete
    })

  },
  name: 'hl7'
}