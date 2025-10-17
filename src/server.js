require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const SecurityConfig = require('./config/security-config.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Instance d'application express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialisation de la sécurité
SecurityConfig.initSecurity(app);

// Configuration Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do App API',
      version: '1.0.0',
      description: 'Documentation de l’API To-Do App',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66f1c03ae5f5b3bb243f87e5' },
            username: { type: 'string', example: 'JohnDoe' },
            email: { type: 'string', example: 'johndoe@example.com' },
            password: { type: 'string', example: 'motdepasse123' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-10-17T14:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-10-17T15:00:00.000Z' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66f1c03ae5f5b3bb243f87e5' },
            title: { type: 'string', example: 'Faire les courses' },
            description: { type: 'string', example: 'Acheter du pain et du lait' },
            completed: { type: 'boolean', example: false },
            priority: { type: 'string', enum: ['low','medium','high'], example: 'medium' },
            dueDate: { type: 'string', format: 'date', example: '2025-10-20' },
            user: { type: 'string', example: '66f1c03ae5f5b3bb243f87e5' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-10-17T14:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-10-17T15:00:00.000Z' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'], // chemin vers tes fichiers de routes
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes principales
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/tasks', require('./routes/tasksRoutes.js'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Todo List fonctionne !' });
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Gestion des erreurs
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
});

const PORT = process.env.PORT || 5000;

// Connexion à la base de données + démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📊 Environnement: ${process.env.NODE_ENV}`);
    console.log(`📘 Swagger disponible sur http://localhost:${PORT}/api-docs`);
  });
});
