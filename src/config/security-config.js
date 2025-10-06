// security-config.js - Version simplifiée
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');

class SecurityConfig {
  static initSecurity(app) {
    // 1. Helmet - Headers de sécurité
    this.setupHelmet(app);
    // 2. Rate Limiting - Protection DDoS
    this.setupRateLimiting(app);
    // 3. Input Sanitization - Nettoyage des données
    this.setupSanitization(app);
    // 4. HPP - Protection pollution paramètres
    this.setupHPP(app);
    console.log('🛡️  Configuration de sécurité initialisée');
  }

  static setupHelmet(app) {
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));
  }

  static setupRateLimiting(app) {
    // Limiteur général
    const generalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // 1000 requêtes
      message: { error: 'Trop de requêtes.' },
      standardHeaders: true,
      skipSuccessfulRequests: true,
    });

    // Limiteur authentification
    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: { error: 'Trop de tentatives.' },
      skipSuccessfulRequests: true,
    });

    app.use('/', generalLimiter);
    app.use('/api/auth/login', authLimiter);
    app.use('/api/auth/register', authLimiter);
  }

  static setupSanitization(app) {
    app.use(xss()); 
  }

  static setupHPP(app) {
    app.use(hpp({
      whitelist: ['priority', 'sort', 'page'] // Paramètres autorisés multiples
    }));
  }
}

module.exports = SecurityConfig;