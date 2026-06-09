const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { logEvent } = require('../utils/logger');
const apiKeyAuth = require('../middleware/apiKeyAuth');
const { deviceLimiter } = require('../middleware/rateLimiter');
const { validateReading } = require('../middleware/validate');
const replayCheck = require('../middleware/replayCheck');

router.post('/', deviceLimiter, apiKeyAuth, validateReading, replayCheck, async (req, res) => {
    const { weight, waterQuality, timestamp } = req.body;
    const deviceID = req.deviceInfo.id;
    const userID = req.deviceInfo.user_id;
    const deviceKey = req.headers['x-api-key'];
    const ip = req.ip;

    try {
        await db.execute(
            'INSERT INTO HydrationReadings (device_id, user_id, weight_grams, water_consumed_ml) VALUES (?,?,?,?)',
            [deviceID, userID, weight, waterQuality]
        );

        await logEvent('READING_ACCEPTED', deviceKey, ip,
            `Weight: ${weight}g, Quality: ${waterQuality}`);

        return res.status(200).json({
            success: true,
            message: 'Reading saved',
            data: { weight, waterQuality }
        });

    } catch (err) {
        await logEvent('SAVE_FAILED', deviceKey, ip, err.message);
        return res.status(500).json({ error: 'Failed to save reading' });
    }
});

router.get('/log', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM SecurityLog ORDER BY created_at DESC LIMIT 50'
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch log' });
    }
});

module.exports = router;