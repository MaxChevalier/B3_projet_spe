const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const levelRoutes = require('./routes/levelRoutes');
const testRoutes = require('./routes/testRoutes');
const obstacleRoutes = require('./routes/obstacleRoutes');

const app = express();

// Middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());

// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

// Routes pour les niveaux
app.use('/api/levels', levelRoutes);

// Routes pour les tests
app.use('/api/tests', testRoutes);

// Routes pour les obstacles
app.use('/api/obstacles', obstacleRoutes);

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
