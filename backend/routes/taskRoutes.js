const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);  // Récupérer toutes les tâches
router.post('/tasks', taskController.createTask);  // Créer une tâche
router.delete('/tasks/:id', taskController.deleteTask);  // Supprimer une tâche
router.put('/tasks/:id', taskController.updateTask); // Modifier la tâche

module.exports = router;