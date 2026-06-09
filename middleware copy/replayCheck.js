const { logEvent } = require('../utils/logger');

async function replayCheck(req, res, next) {
    const { timestamp } = req.body;
    const now = Date.now();
    const deviceKey = req.headers['x-api-key'];
    const ip = req.ip;

    if (!timestamp) {
        await logEvent('MISSING_TIMESTAMP', deviceKey, ip, 'No timestamp in request');
        return res.status(400).json({ error: 'Timestamp required' });
    }

    const difference = Math.abs(now - timestamp);

    if (difference > 60000) {
        await logEvent(
            'REPLAY_ATTACK',
            deviceKey,
            ip,
            `Timestamp ${difference}ms old — possible replay attack`
        );
        return res.status(400).json({ error: 'Request too old — possible replay attack' });
    }

    next();
}

module.exports = replayCheck;