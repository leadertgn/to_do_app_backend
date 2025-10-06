const Joi = require('joi');

// Validation pour l'inscription
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        'string.pattern.base': 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores',
        'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
        'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères',
        'any.required': 'Le nom d\'utilisateur est obligatoire'
      }),

    email: Joi.string()
      .email()
      .required()
      .normalize()
      .messages({
        'string.email': 'Veuillez fournir un email valide',
        'any.required': 'L\'email est obligatoire'
      }),

    password: Joi.string()
      .min(6)
      .max(100)
      .required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
        'string.pattern.base': 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre',
        'any.required': 'Le mot de passe est obligatoire'
      })
  });

  return schema.validate(data);
};

// Validation pour la connexion
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Veuillez fournir un email valide',
        'any.required': 'L\'email est obligatoire'
      }),

    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Le mot de passe est obligatoire'
      })
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation
};