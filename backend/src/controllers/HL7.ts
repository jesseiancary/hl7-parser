'use strict'

import HL7Model from '../models/HL7';
import HL7Parser from './hl7-parser';

export default class HL7 {

  constructor() {}

  // @route POST /api/hl7
  // @description Add an HL7 document
  // @access Public
  public async create(req, h): Promise<any> {
    // data validation???
    const hl7Document = {
      ...req.payload,
      owner: req.currentUser._id
    };
    return HL7Model.create(hl7Document)
    .then(hl7 => {
      const hl7Parser = new HL7Parser(hl7.hl7_data);
      return hl7Parser.getJson()
      .then(jsonData => {
        return HL7Model.findByIdAndUpdate(hl7._id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true }).populate({ path: 'owner', select: '-password -salt' })
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
  public async find(req, h): Promise<any> {
    // Get records from any owner:
    // return HL7Model.find().populate({ path: 'owner', select: '-password -salt' })
    // Get records from logged in user:
    return HL7Model.find({ owner: req.currentUser._id }).populate({ path: 'owner', select: '-password -salt' })
    .then(hl7 => {
      return h.response(hl7 ? hl7 : { error: 'No records found.' });
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

  // @route GET /api/hl7/:id
  // @description Get single HL7 document by id
  // @access Public
  public async findOne(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    // Get record from any owner:
    // return HL7Model.findById(req.params.id).populate({ path: 'owner', select: '-password -salt' }) 
    // Get record from logged in user:
    return HL7Model.findOne({ _id: req.params.id, owner: req.currentUser._id }).populate({ path: 'owner', select: '-password -salt' })
    .then(hl7 => {
      return h.response(hl7 ? hl7 : { error: 'Record not found.' });
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

  // @route PUT /api/hl7/:id
  // @description Update an HL7 document
  // @access Public
  public async update(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    const hl7Parser = new HL7Parser(req.payload.hl7_data);
    return hl7Parser.getJson()
    .then(jsonData => {
      // Update record from any owner:
      // return HL7Model.findByIdAndUpdate(req.params.id, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true }).populate({ path: 'owner', select: '-password -salt' })
      // Update record from logged in user:
      return HL7Model.findOneAndUpdate({ _id: req.params.id, owner: req.currentUser._id }, { hl7_data: req.payload.hl7_data, json_data: jsonData }, { new: true }).populate({ path: 'owner', select: '-password -salt' })
      .then(hl7_and_json => {
        return h.response(hl7_and_json ? hl7_and_json : { error: 'Record not found.' });
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
  public async delete(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return HL7Model.findByIdAndDelete(req.params.id)
    .then(result => {
      return h.response(result);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  }

}