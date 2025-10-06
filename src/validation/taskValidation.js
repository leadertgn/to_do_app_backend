const Joi = require('joi');

// Validation pour la création de tâche
const createTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(200)
      .required()
      .trim()
      .messages({
        'string.min': 'Le titre ne peut pas être vide',
        'string.max': 'Le titre ne peut pas dépasser 200 caractères',
        'any.required': 'Le titre est obligatoire'
      }),

    description: Joi.string()
      .max(1000)
      .allow('')
      .trim()
      .messages({
        'string.max': 'La description ne peut pas dépasser 1000 caractères'
      }),

    priority: Joi.string()
      .valid('low', 'medium', 'high')
      .default('medium')
      .messages({
        'any.only': 'La priorité doit être low, medium ou high'
      }),

    dueDate: Joi.date()
      .greater('now')
      .optional()
      .messages({
        'date.greater': 'La date d\'échéance doit être dans le futur'
      }),

    completed: Joi.boolean()
      .default(false)
  });

  return schema.validate(data);
};

// Validation pour la mise à jour de tâche
const updateTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(200)
      .trim(),

    description: Joi.string()
      .max(1000)
      .allow('')
      .trim(),

    priority: Joi.string()
      .valid('low', 'medium', 'high'),

    dueDate: Joi.date()
      .greater('now')
      .optional(),

    completed: Joi.boolean()
  }).min(1) // Au moins un champ doit être fourni pour la mise à jour
    .messages({
      'object.min': 'Au moins un champ doit être fourni pour la mise à jour'
    });

  return schema.validate(data);
};

module.exports = {
  createTaskValidation,
  updateTaskValidation
};