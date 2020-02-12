'use strict'

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/User';

process.env.SECRET_KEY = 'secret';

export default {

  // @route POST /api/users
  // @description Create a user
  // @access Public
  async create(req, h) {
    // data validation???
    return User.findOne({
      email: req.payload.email
    })
    .then(user => {
      if (!user) {
        const result = bcrypt.hash(req.payload.password, 10, (err, hash) => {
          req.payload.password = hash;
          return User.create(req.payload)
          .then(user => {
            // THIS IS NOT BEING RETURNED
            return { status: user.email + ' Registered!' };
          })
          .catch(err => {
            return 'error: ' + err;
          });
        });
        return h.response({ status: req.payload.email + ' registered.' });
      } else {
        return h.response({ error: 'User already exists.' });
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route GET /api/users
  // @description Get all users
  // @access Public
  async find(req, h) {
    return User.find()
    .then(users => {
      return h.response(users);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route GET /api/users/:id
  // @description Get single user by id
  // @access Public
  async findOne(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return User.findById(req.params.id)
    .then(user => {
      return h.response(user);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route PUT /api/users/:id
  // @description Update a user
  // @access Public
  async update(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return User.findByIdAndUpdate(req.params.id, req.payload, { new: true })
    .then(result => {
      return h.response(result);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route DELETE /api/users/:id
  // @description Delete a user
  // @access Public
  async delete(req, h) {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400);
    return User.findByIdAndDelete(req.params.id)
    .then(result => {
      return h.response(result);
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route POST /api/users/login
  // @description Log in user
  // @access Public
  async login(req, h) {
    return User.findOne({
      email: req.payload.email
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.payload.password, user.password)) {
          const payload = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          return h.response({token});
        } else {
          return h.response({ error: 'Incorrect password.' });
        }
      } else {
        return h.response({ error: 'User does not exist.' });
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    });
  },

  // @route GET /api/users/:id/profile
  // @description Get user profile
  // @access Public
  async profile(req, h) {
    var decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    return User.findOne({
      _id: mongoose.Types.ObjectId(decoded.id)
    })
    .then(user => {
      console.log(user);
      if (user) {
        return h.response({ user });
      } else {
        return h.response({ error: 'User does not exist' });
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500);
    })
  }

};