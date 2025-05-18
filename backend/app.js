const express = require('express');
const cors = require('cors');
const candidateRoutes = require('./routes/candidateRoutes');
const voterRoutes = require('./routes/voterRoutes');
const voteRoutes = require('./routes/voteRoutes');
const ganadorRoutes = require('./routes/ganadorRoutes');




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/candidates', candidateRoutes);
app.use('/api/voters', voterRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/ganador', ganadorRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API de Votación funcionando ✔️');
});

module.exports = app;
