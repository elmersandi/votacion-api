const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
