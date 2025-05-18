const express = require('express');
const router = express.Router();
const { obtenerGanador } = require('../controllers/ganadorController');

router.get('/', obtenerGanador);

module.exports = router;
