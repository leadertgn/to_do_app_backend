const express = require('express');
const auth = require('../middleware/auth');
const taskControllers = require('../controllers/tasksController');
const { validateCreateTask, validateUpdateTask } = require('../middleware/validation.js');
const router = express.Router();

// GET /api/tasks - Récupérer toutes les tâches de l'utilisateur
router.get('/', auth,taskControllers.getTasks);
// POST /api/tasks - Créer une nouvelle tâche
router.post('/',validateCreateTask,auth,taskControllers.createTask);
// PUT /api/tasks/:id - Modifier une tâche
router.put('/:id',validateUpdateTask,auth,taskControllers.updateTask);
// DELETE /api/tasks/:id - Supprimer une tâche
router.delete('/:id', auth,taskControllers.deleteTask);


module.exports = router;