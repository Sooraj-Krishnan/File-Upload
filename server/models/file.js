
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileId: {
    type: Number,
    required: true,
    unique: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  // filePath: {
  //   type: String,
  //   required: true,
  fileData: {
    type: Buffer, // Binary data
    required: true,
  },
});

module.exports = mongoose.model('File', fileSchema);
