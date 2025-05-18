const express = require('express');
const router = express.Router();
const {
  getCandidates,
  createCandidate
} = require('../controllers/candidateController');

// Rutas
router.get('/', getCandidates);
router.post('/', createCandidate);

module.exports = router;
