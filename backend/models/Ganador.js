const mongoose = require('mongoose');

const ganadorSchema = new mongoose.Schema({
  candidato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
    unique: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ganador', ganadorSchema);
