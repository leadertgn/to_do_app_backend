const { registerValidation, loginValidation } = require('../validation/authValidation');
const { createTaskValidation, updateTaskValidation } = require('../validation/taskValidation');

// Middleware pour valider l'inscription
const validateRegister = (req, res, next) => {
  const { error } = registerValidation(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Données d\'inscription invalides',
      details: error.details[0].message
    });
  }
  
  next();
};

// Middleware pour valider la connexion
const validateLogin = (req, res, next) => {
  const { error } = loginValidation(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Données de connexion invalides',
      details: error.details[0].message
    });
  }
  
  next();
};

// Middleware pour valider la création de tâche
const validateCreateTask = (req, res, next) => {
  const { error } = createTaskValidation(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Données de tâche invalides',
      details: error.details[0].message
    });
  }
  
  next();
};

// Middleware pour valider la mise à jour de tâche
const validateUpdateTask = (req, res, next) => {
  const { error } = updateTaskValidation(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Données de mise à jour invalides',
      details: error.details[0].message
    });
  }
  
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateTask,
  validateUpdateTask
};