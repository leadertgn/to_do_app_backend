const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/tasks - Récupérer toutes les tâches de l'utilisateur
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
});

// POST /api/tasks - Créer une nouvelle tâche
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      user: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la tâche.' });
  }
});

// PUT /api/tasks/:id - Modifier une tâche
router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        task[key] = req.body[key];
      }
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la modification de la tâche.' });
  }
});

// DELETE /api/tasks/:id - Supprimer une tâche
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.' });
  }
});

module.exports = router;