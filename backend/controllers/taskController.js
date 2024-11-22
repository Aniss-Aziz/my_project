const taskModel = require('../models/task');

const createTask = (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
      return res.status(400).send('Title, description, and status are required');
    }
    const newTask = taskModel.createTask(title, description, status);
    return res.status(201).json(newTask);
};

const getTasks = (req, res) => {
    const tasks = taskModel.getTasks();
    return res.json(tasks);
};

const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const deletedTask = taskModel.deleteTask(taskId);
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }
    return res.status(200).send('Task deleted');
};

// Méthode pour mettre à jour une tâche
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10); // ID de la tâche à partir de l'URL
  const { title, description, status } = req.body; // Données envoyées dans le corps de la requête

  if (!title || !description || !status) {
    return res.status(400).send('Title, description, and status are required');
  }

  // Mise à jour de la tâche dans le modèle
  const updatedTask = taskModel.updateTask(taskId, title, description, status);

  if (!updatedTask) {
    return res.status(404).send('Task not found');
  }

  return res.status(200).json(updatedTask); // Renvoie la tâche mise à jour
};




module.exports = { createTask, getTasks, deleteTask, updateTask };