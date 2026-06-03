require('dotenv').config();
const express = require('express');
const readingsRoute = require('./routes/readings');

const app = express();
app.use(express.json());

app.use('/api/readings', readingsRoute);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'H2Go security API running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`H2Go security server running on port ${PORT}`);
});