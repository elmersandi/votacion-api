const Candidate = require('../models/Candidate');

// Obtener todos los candidatos
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener candidatos' });
  }
};

// Crear un nuevo candidato
exports.createCandidate = async (req, res) => {
  try {
    const { nombre, apellido, partido } = req.body;
    const nuevo = new Candidate({ nombre, apellido, partido });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear candidato' });
  }
};
