require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/tasks', require('./routes/tasksRoutes.js'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Todo List fonctionne !' });
});

// Gestion des routes non trouvées - SIMPLIFIÉE
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Gestion des erreurs
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 Environnement: ${process.env.NODE_ENV}`);
});