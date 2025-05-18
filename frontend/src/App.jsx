import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', partido: '' });
  const [voterForm, setVoterForm] = useState({ nombre: '', apellido: '', dni: '' });
  const [voteForm, setVoteForm] = useState({ voterId: '', candidateId: '' });
  const [ganador, setGanador] = useState(null);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('/api/candidates');
      const data = await res.json();
      setCandidates(data);
      const winner = data.find((c) => c.votos >= 10);
      if (winner) setGanador(winner);
    } catch (error) {
      console.error('Error al obtener candidatos', error);
    }
  };

  const fetchVoters = async () => {
    try {
      const res = await fetch('/api/voters');
      const data = await res.json();
      setVoters(data);
    } catch (error) {
      console.error('Error al obtener votantes', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchVoters();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ nombre: '', apellido: '', partido: '' });
        fetchCandidates();
      }
    } catch (error) {
      console.error('Error al agregar candidato', error);
    }
  };

  const handleVoterChange = (e) => {
    setVoterForm({ ...voterForm, [e.target.name]: e.target.value });
  };

  const handleVoterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/voters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voterForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Votante registrado');
        setVoterForm({ nombre: '', apellido: '', dni: '' });
        fetchVoters();
      } else {
        alert('⚠️ ' + (data.message || 'Error al registrar votante'));
      }
    } catch (error) {
      console.error('Error al registrar votante', error);
    }
  };

  const handleVoteChange = (e) => {
    setVoteForm({ ...voteForm, [e.target.name]: e.target.value });
  };

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voteForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert('🗳️ Voto registrado correctamente');
        setVoteForm({ voterId: '', candidateId: '' });
        fetchCandidates();
      } else {
        alert('⚠️ ' + (data.message || 'Error al votar'));
      }
    } catch (error) {
      console.error('Error al emitir voto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Candidatos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input type="text" name="partido" placeholder="Partido" value={form.partido} onChange={handleChange} required />
        <button type="submit">Agregar Candidato</button>
      </form>

      <h2>Votantes</h2>
      {ganador ? (
        <div className="alerta-final">
          🏁 La votación ha finalizado. Ganador: {ganador.nombre} {ganador.apellido} ({ganador.votos} votos)
        </div>
      ) : (
        <form onSubmit={handleVoterSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={voterForm.nombre} onChange={handleVoterChange} required />
          <input type="text" name="apellido" placeholder="Apellido" value={voterForm.apellido} onChange={handleVoterChange} required />
          <input type="text" name="dni" placeholder="DNI" value={voterForm.dni} onChange={handleVoterChange} required />
          <button type="submit">Registrar Votante</button>
        </form>
      )}

      <h2>Emitir Voto</h2>
      {ganador ? (
        <p style={{ fontStyle: 'italic' }}>✅ No se pueden emitir más votos</p>
      ) : (
        <form onSubmit={handleVoteSubmit}>
          <select name="voterId" value={voteForm.voterId} onChange={handleVoteChange} required>
            <option value="">Selecciona un votante</option>
            {voters.map((v) => (
              <option key={v._id} value={v._id}>
                {v.nombre} {v.apellido} (DNI: {v.dni})
              </option>
            ))}
          </select>

          <select name="candidateId" value={voteForm.candidateId} onChange={handleVoteChange} required>
            <option value="">Selecciona un candidato</option>
            {candidates.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombre} {c.apellido} - {c.partido}
              </option>
            ))}
          </select>

          <button type="submit">Emitir Voto</button>
        </form>
      )}

      <h2>Lista de Candidatos</h2>
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.nombre} {c.apellido} - {c.partido} ({c.votos} votos)
          </li>
        ))}
      </ul>

      {ganador && (
        <div className="ganador-card">
          <h2>🥇 Ganador</h2>
          <p>
            {ganador.nombre} {ganador.apellido} - {ganador.partido}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
