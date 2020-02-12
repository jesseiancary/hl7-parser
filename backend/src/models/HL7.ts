import mongoose from 'mongoose';

const HL7Schema = new mongoose.Schema({
  hl7_data: {
    type: String,
    required: true
  },
  json_data: Object
}, {
  timestamps: true
});

const HL7 = mongoose.model('hl7', HL7Schema);

export default HL7;