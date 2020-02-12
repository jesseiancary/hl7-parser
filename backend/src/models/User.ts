import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
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
    required: true
  },

  password: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

export default model<IUser & Document>('User', UserSchema);