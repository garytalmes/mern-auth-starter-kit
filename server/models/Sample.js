const { Schema, model } = require('mongoose');

const sampleSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const Sample = model('Sample', sampleSchema);
module.exports = Sample;
