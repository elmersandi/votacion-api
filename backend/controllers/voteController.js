const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const { registrarGanador } = require('./ganadorController');

exports.castVote = async (req, res) => {
  try {
    const { voterId, candidateId } = req.body;

    // Verificar si ya votó
    const alreadyVoted = await Vote.findOne({ voter: voterId });
    if (alreadyVoted) {
      return res.status(400).json({ message: 'Este votante ya ha votado' });
    }

    // Registrar el voto
    const vote = new Vote({ voter: voterId, candidate: candidateId });
    await vote.save();

    // Sumar un voto al candidato
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votos: 1 } });

    // Verificar si alcanzó 10 votos
    const actualizado = await Candidate.findById(candidateId);
    if (actualizado.votos === 10) {
      await registrarGanador(candidateId);
    }

    res.status(201).json({ message: 'Voto registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar voto:', error);
    res.status(500).json({ message: 'Error al registrar el voto' });
  }
};
