const db = require('../db/connection');
const { logEvent } = require('../utils/logger');

async function apiKeyAuth(req, res, next) {
    const deviceKey = req.headers['x-api-key'];
    const ip = req.ip;

    if (!deviceKey) {
        await logEvent('MISSING_API_KEY', null, ip, 'Request with no API key');
        return res.status(401).json({ error: 'API key required' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM DeviceKeys WHERE device_key = ? AND is_active = TRUE',
            [deviceKey]
        );

        if (rows.length === 0) {
            await logEvent('INVALID_API_KEY', deviceKey, ip, 'Unrecognised or inactive key');
            return res.status(401).json({ error: 'Invalid API key' });
        }

        req.deviceInfo = rows[0];
        next();

    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = apiKeyAuth;