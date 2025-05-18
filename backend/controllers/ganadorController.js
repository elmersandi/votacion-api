const Ganador = require('../models/Ganador');

// Guardar al candidato como ganador (solo si no hay uno)
exports.registrarGanador = async (candidateId) => {
  const yaExiste = await Ganador.findOne();
  if (!yaExiste) {
    await Ganador.create({ candidato: candidateId });
  }
};

// Consultar el ganador
exports.obtenerGanador = async (req, res) => {
  try {
    const ganador = await Ganador.findOne().populate('candidato');
    if (ganador) {
      res.json(ganador);
    } else {
      res.status(404).json({ message: 'Aún no hay ganador' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ganador' });
  }
};
