const db = require('../db/connection');

async function logEvent(eventType, deviceKey, ipAddress, details) {
    try {
        await db.execute(
            'INSERT INTO SecurityLog (event_type, device_key, ip_address, details) VALUES (?,?,?,?)',
            [eventType, deviceKey || null, ipAddress, details]
        );
    } catch (err) {
        console.error('Logging error:', err.message);
    }
}

module.exports = { logEvent };