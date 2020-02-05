'use strict'

const HL7 = require('../models/HL7');
const hl7Parser = require('./hl7-parser');

module.exports = {

  // @route POST /api/hl7
  // @description Add an HL7 document
  // @access Public
  async create(req, h) {
    // data validation???
    try {

      // First save the raw HL7 to the database
      var hl7 = new HL7(req.payload);
      var result = await hl7.save();
      // or
      // var result = await HL7.create(req.payload).exec();

      // Then convert the HL7 data to JSON and update the database record
      if (result._id) {
        const jsonData = await hl7Parser.getJson(req.payload.hl7_data);
        // console.log(JSON.stringify(jsonData).replace(/\'/g, "''"));
        result = await HL7.findByIdAndUpdate(result._id, { json_data: jsonData }, { new: true }).exec();
      }

      return h.response(result);
    } catch(err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  // @route GET /api/hl7
  // @description Get all HL7 documents
  // @access Public
  async find(req, h) {
    try {
      var hl7 = await HL7.find().exec();
      return h.response(hl7);
      // return h.view('hl7', { hl7 });
    } catch(err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  // @route GET /api/hl7/:id
  // @description Get single HL7 document by id
  // @access Public
  async findOne(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    try {
      var hl7 = await HL7.findById(req.params.id).exec();
      return h.response(hl7);
    } catch(err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  // @route PUT /api/hl7/:id
  // @description Update an HL7 document
  // @access Public
  async update(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    try {
      var result = await HL7.findByIdAndUpdate(req.params.id, req.payload, { new: true }).exec();
      return h.response(result);
    } catch(err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  // @route DELETE /api/hl7/:id
  // @description Delete an HL7 document
  // @access Public
  async delete(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    try {
      var result = await HL7.findByIdAndDelete(req.params.id).exec();
      return h.response(result);
    } catch(err) {
      return h.response({ error: err.message }).code(500);
    }
  }

};