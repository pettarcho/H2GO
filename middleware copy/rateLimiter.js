const rateLimit = require('express-rate-limit');
const { logEvent } = require('../utils/logger');

const deviceLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    keyGenerator: (req) => req.headers['x-api-key'] || req.ip,
    handler: async (req, res) => {
        await logEvent(
            'RATE_LIMIT_EXCEEDED',
            req.headers['x-api-key'],
            req.ip,
            'More than 10 requests per minute'
        );
        res.status(429).json({ error: 'Too many requests — slow down' });
    }
});

module.exports = { deviceLimiter };