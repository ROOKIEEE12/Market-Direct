require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection & Sync
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected');

        // Sync models. Using { alter: true } updates tables to match models without dropping data if possible
        await sequelize.sync({ alter: true });
        console.log('Database Synced');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

// Routes
// We need to rewrite these routes to use Sequelize models before they will work correctly
app.use('/api/farmers', require('./routes/farmers'));
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send('Farmer Market Direct API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER_ERROR:', err.stack);
    res.status(500).json({
        msg: 'Something went wrong on the server',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

startServer();
