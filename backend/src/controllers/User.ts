'use strict'

import UserModel from '../models/User'
import argon2 from 'argon2'
import { randomBytes } from 'crypto'
import uuidv1 from 'uuid/v1'
import mongoose from 'mongoose'

export default class User {

  constructor() {}

  // @route POST /api/users
  // @description Create a user
  // @access Public
  public async create(req, h): Promise<any> {
    return UserModel.findOne({
      email: req.payload.user.email
    })
    .then(user => {
      if (!user) {
        const salt = randomBytes(32)
        return argon2.hash(req.payload.user.password, { salt })
        .then(passwordHashed => {
          req.payload.user.password = passwordHashed
          req.payload.user.salt = salt.toString('hex')
          return UserModel.create(req.payload.user)
          .then(user => {
            const sid = uuidv1()
            return req.server.app.cache.set(sid, { user }, 0)
            .then(() => {
              req.cookieAuth.set({ sid })
              return h.response({
                user: {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  scope: user.scope
                }
              })
            })
            .catch(err => {
              return h.response({ error: err.message }).code(500)
            })
          })
          .catch(err => {
            return h.response({ error: err.message }).code(500)
          })
        })
        .catch(err => {
          return h.response({ error: err.message }).code(500)
        })
      } else {
        return h.response({ error: 'User already exists.' })
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route GET /api/users
  // @description Get all users
  // @access Public
  public async find(req, h): Promise<any> {
    return UserModel.find()
    .then(users => {
      return h.response({ users: users })
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route GET /api/users/:id
  // @description Get single user by id
  // @access Public
  public async findOne(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400)
    return UserModel.findById(req.params.id)
    .then(user => {
      return h.response({
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          scope: user.scope
        }
      })
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route PUT /api/users/:id
  // @description Update a user
  // @access Public
  public async update(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400)
    return UserModel.findByIdAndUpdate(req.params.id, req.payload.user, { new: true })
    .then(user => {
      return h.response({
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          scope: user.scope
        }
      })
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route DELETE /api/users/:id
  // @description Delete a user
  // @access Public
  public async delete(req, h): Promise<any> {
    if (!req.params.id) return h.response({ error: 'id is required param' }).code(400)
    return UserModel.findByIdAndDelete(req.params.id)
    .then(result => {
      return h.response(result)
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route POST /api/users/login
  // @description Log in user
  // @access Public
  public async login(req, h): Promise<any> {
    return UserModel.findOne({
      email: req.payload.user.email
    })
    .then(user => {
      if (user) {
        return argon2.verify(user.password, req.payload.user.password)
        .then(verified => {
          if (verified) {
            const sid = uuidv1()
            return req.server.app.cache.set(sid, { user }, 0)
            .then(() => {
              req.cookieAuth.set({ sid })
              return h.response({
                user: {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  scope: user.scope
                }
              })
            })
            .catch(err => {
              return h.response({ error: err.message }).code(500)
            })
          } else {
            return h.response({ error: 'Incorrect password.' })
          }
        })
        .catch(err => {
          return h.response({ error: err.message }).code(500)
        })
      } else {
        return h.response({ error: 'User does not exist.' })
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route GET /api/users/logout
  // @description Log out user
  // @access Public
  public async logout(req, h): Promise<any> {
    req.server.app.cache.drop(req.state['authentication'].sid)
    req.cookieAuth.clear()
    return h.response
  }

  // @route GET /api/users/profile
  // @description Get user profile
  // @access Public
  public async profile(req, h): Promise<any> {
    return UserModel.findOne({
      _id: mongoose.Types.ObjectId(req.auth.credentials._id)
    })
    .then(user => {
      if (user) {
        return h.response({
          user: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            scope: user.scope
          }
        })
      } else {
        return h.response({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      return h.response({ error: err.message }).code(500)
    })
  }

  // @route POST /api/users/login-as
  // @description Log in admin user as another user
  // @access Public
  public async loginAs(req, h): Promise<any> {
    return UserModel.findOne({
      email: req.payload.user.email
    })
    .then(user => {
      if (user) {
        const sid = uuidv1()
        return req.server.app.cache.set(sid, { user }, 0)
        .then(() => {
          req.cookieAuth.set({ sid })
          return h.response({
            user: {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              scope: user.scope
            }
          })
        })
        .catch(err => {
          return h.response({ error: err.message }).code(500)
        })
      } else {
        return h.response({ error: 'User does not exist.' })
      }
    })
  }

}