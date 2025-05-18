const express = require('express');
const router = express.Router();
const {
  getVoters,
  createVoter
} = require('../controllers/voterController');

// Rutas de votantes
router.get('/', getVoters);
router.post('/', createVoter);

module.exports = router;
