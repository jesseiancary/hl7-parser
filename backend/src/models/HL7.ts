import { Schema, model, Document } from 'mongoose';

export interface IHl7 extends Document {
  hl7_data: string;
  json_data: object;
  owner: string;
}

const HL7Schema: Schema = new Schema({

  hl7_data: {
    type: String,
    required: true
  },

  json_data: Object,

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});

export default model<IHl7 & Document>('HL7', HL7Schema);