const Voter = require('../models/Voter');

// Obtener todos los votantes
exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener votantes' });
  }
};

// Registrar un nuevo votante
exports.createVoter = async (req, res) => {
  try {
    const { nombre, apellido, dni } = req.body;

    // Verificar si ya existe un votante con ese DNI
    const existe = await Voter.findOne({ dni });
    if (existe) {
      return res.status(400).json({ message: 'El votante ya está registrado' });
    }

    const nuevo = new Voter({ nombre, apellido, dni });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar votante' });
  }
};
