'use strict'

const HL7 = require('../models/HL7');
const hl7Parser = require('./hl7-parser');

module.exports = {

  // @route POST /api/hl7
  // @description Add an HL7 document
  // @access Public
  async create(req, h) {
    // data validation???
    return HL7.create(req.payload)
    .then(hl7 => {
      return hl7Parser.getJson(hl7.hl7_data)
      .then(jsonData => {
        return HL7.findByIdAndUpdate(hl7._id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true })
        .then(hl7_and_json => {
          return h.response(hl7_and_json);
        })
        .catch(err => {
          return h.response({ error: err.message }).code(500);
        });
      })
      .catch(err => {
        return h.response({ error: err.message }).code(500);
      });
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route GET /api/hl7
  // @description Get all HL7 documents
  // @access Public
  async find(req, h) {
    return HL7.find()
    .then(hl7 => {
      return h.response(hl7);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route GET /api/hl7/:id
  // @description Get single HL7 document by id
  // @access Public
  async findOne(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return HL7.findById(req.params.id)
    .then(hl7 => {
      return h.response(hl7);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route PUT /api/hl7/:id
  // @description Update an HL7 document
  // @access Public
  async update(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return hl7Parser.getJson(req.payload.hl7_data)
    .then(jsonData => {
      return HL7.findByIdAndUpdate(req.params.id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true })
      .then(hl7_and_json => {
        return h.response(hl7_and_json);
      })
      .catch(err => {
        return h.response({ error: err.message }).code(500);
      });
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route DELETE /api/hl7/:id
  // @description Delete an HL7 document
  // @access Public
  async delete(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return HL7.findByIdAndDelete(req.params.id)
    .then(result => {
      return h.response(result);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

};