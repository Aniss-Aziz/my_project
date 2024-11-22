let tasks = [];  
let taskId = 1; 

class Task {
    constructor(title, description, status) {
      this.id = taskId++;
      this.title = title;
      this.description = description;
      this.status = status; 
    }
}

// Méthodes pour manipuler les tâches
const createTask = (title, description, status) => {
    const task = new Task(title, description, status);
    tasks.push(task);
    return task;
};

const getTasks = () => tasks;

const deleteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      return tasks.splice(taskIndex, 1);  // Supprimer la tâche
    }
    return null;
};

// Méthode pour mettre à jour une tâche
const updateTask = (id, title, description, status) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return null; // Si la tâche n'existe pas, retourner null

  // Mettre à jour les valeurs de la tâche
  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  tasks[taskIndex].status = status;

  return tasks[taskIndex];  // Retourner la tâche mise à jour
};


module.exports = { createTask, getTasks, deleteTask, updateTask };