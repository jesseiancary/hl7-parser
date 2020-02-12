import { Schema, model, Document } from 'mongoose';

export interface IHl7 extends Document {
  hl7_data: string;
  json_data: object;
}

const HL7Schema: Schema = new Schema({

  hl7_data: {
    type: String,
    required: true
  },

  json_data: Object

}, {
  timestamps: true
});

export default model<IHl7 & Document>('hl7', HL7Schema);