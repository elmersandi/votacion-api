const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  partido: {
    type: String,
    required: true,
  },
  votos: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
