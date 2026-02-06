const express = require('express');
const router = express.Router();
const { Farmer, User } = require('../models');

const auth = require('../middleware/auth');

// @route   GET api/farmers
// @desc    Get all farmers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'email']
            }]
        });
        res.json(farmers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/farmers/me
// @desc    Get current farmer profile
// @access  Private (Farmer only)
router.get('/me', auth, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const farmer = await Farmer.findOne({
            where: { userId: req.user.id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'email']
            }]
        });

        if (!farmer) {
            return res.status(404).json({ msg: 'Farmer profile not found' });
        }

        res.json(farmer);
    } catch (err) {
        console.error('GET /me Error:', err.stack || err.message);
        res.status(500).json({ msg: 'Server Error fetching profile', error: err.message });
    }
});

// @route   POST api/farmers
// @desc    Create or Update farmer profile
// @access  Private
router.post('/', auth, async (req, res) => {
    const { bio, specialty, location, image, experience } = req.body;

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        let farmer = await Farmer.findOne({ where: { userId: req.user.id } });

        if (farmer) {
            // Update
            farmer = await farmer.update({ bio, specialty, location, image, experience });
            console.log('Farmer Profile Updated:', req.user.id);
        } else {
            // Create
            farmer = await Farmer.create({
                userId: req.user.id,
                bio,
                specialty,
                location,
                image,
                experience
            });
            console.log('Farmer Profile Created:', req.user.id);
        }
        res.json(farmer);
    } catch (err) {
        console.error('POST /farmers Error:', err.stack || err.message);
        res.status(500).json({ msg: 'Server Error saving profile', error: err.message });
    }
});

module.exports = router;
