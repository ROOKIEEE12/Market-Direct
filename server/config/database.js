const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use POSTGRES_URI from .env or default to local
const sequelize = new Sequelize(process.env.POSTGRES_URI || 'postgres://postgres:password@localhost:5432/farmer_market', {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
