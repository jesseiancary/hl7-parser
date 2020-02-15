import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  first_name: string
  last_name: string
  email: string
  password?: string
  salt?: string
}

const UserSchema: Schema = new Schema({

  first_name: {
    type: String
  },

  last_name: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    required: true
  },

  scope: {
    type: Array,
    default: ['user']
  }

}, {
  timestamps: true
})

export default model<IUser & Document>('User', UserSchema)