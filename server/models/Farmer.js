const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Farmer = sequelize.define('Farmer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // userId foreign key to be added via associations
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.STRING,
        defaultValue: '5+ years'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 5.0
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    achievements: {
        type: DataTypes.JSON, // Storing array of strings as JSON
        defaultValue: []
    }
}, {
    timestamps: true
});

module.exports = Farmer;
