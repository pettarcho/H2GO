const { body, validationResult } = require('express-validator');

const validateReading = [
    body('weight')
        .isFloat({ min: 0, max: 5000 })
        .withMessage('Weight must be between 0 and 5000 grams'),
    body('waterQuality')
        .isFloat({ min: 0, max: 100 })
        .withMessage('Water quality must be between 0 and 100'),
    body('timestamp')
        .isInt({ min: 0 })
        .withMessage('Timestamp must be a valid number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateReading };