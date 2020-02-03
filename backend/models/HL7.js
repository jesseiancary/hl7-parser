const mongoose = require('mongoose');

const HL7Schema = mongoose.Schema({
  hl7_data: {
    type: String,
    required: true
  },
  json_data: String
}, {
  timestamps: true
});

module.exports = HL7 = mongoose.model('hl7', HL7Schema);