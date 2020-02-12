'use strict'

import HL7Model from '../models/HL7';
import HL7Parser from './hl7-parser';

export default class HL7 {

  constructor() {}

  // @route POST /api/hl7
  // @description Add an HL7 document
  // @access Public
  public async create(req, h) {
    // data validation???
    return HL7Model.create(req.payload)
    .then(hl7 => {
      const hl7Parser = new HL7Parser(hl7.hl7_data);
      return hl7Parser.getJson()
      .then(jsonData => {
        return HL7Model.findByIdAndUpdate(hl7._id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true })
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
  }

  // @route GET /api/hl7
  // @description Get all HL7 documents
  // @access Public
  public async find(req, h) {
    return HL7Model.find()
    .then(hl7 => {
      return h.response(hl7);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

  // @route GET /api/hl7/:id
  // @description Get single HL7 document by id
  // @access Public
  public async findOne(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return HL7Model.findById(req.params.id)
    .then(hl7 => {
      return h.response(hl7);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

  // @route PUT /api/hl7/:id
  // @description Update an HL7 document
  // @access Public
  public async update(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    const hl7Parser = new HL7Parser(req.payload.hl7_data);
    return hl7Parser.getJson()
    .then(jsonData => {
      return HL7Model.findByIdAndUpdate(req.params.id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true })
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
  }

  // @route DELETE /api/hl7/:id
  // @description Delete an HL7 document
  // @access Public
  public async delete(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return HL7Model.findByIdAndDelete(req.params.id)
    .then(result => {
      return h.response(result);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

};