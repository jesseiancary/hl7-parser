'use strict'

import HL7Controller from '../../controllers/HL7';
const HL7 = new HL7Controller();

exports.plugin = {
  register: (server, options, next) => {
  
    server.route({
      method: 'POST',
      path: '/hl7',
      handler: HL7.create
    }),
  
    server.route({
      method: 'GET',
      path: '/hl7',
      handler: HL7.find
    }),
  
    server.route({
      method: 'GET',
      path: '/hl7/{id}',
      handler: HL7.findOne
    }),
  
    server.route({
      method: 'PUT',
      path: '/hl7/{id}',
      handler: HL7.update
    }),
  
    server.route({
      method: 'DELETE',
      path: '/hl7/{id}',
      handler: HL7.delete
    })

  },
  name: 'hl7'
}