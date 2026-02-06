const express = require('express');
const router = express.Router();
const { Product, Farmer, User } = require('../models');
const { Op } = require('sequelize');

// @route   GET api/products
// @desc    Get all products with filtering, sorting, and search
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort, farmerId } = req.query;

        // Build Query Object
        let query = {};

        // Search (Name or Description)
        if (search) {
            query[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // Filter by Category
        if (category && category !== 'All') {
            query.category = category;
        }

        // Filter by Farmer
        if (farmerId) {
            query.farmerId = farmerId;
        }

        // Filter by Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price[Op.gte] = Number(minPrice);
            if (maxPrice) query.price[Op.lte] = Number(maxPrice);
        }

        // Sorting Logic
        let order = [['createdAt', 'DESC']]; // Default: Newest first
        if (sort === 'price_asc') order = [['price', 'ASC']];
        if (sort === 'price_desc') order = [['price', 'DESC']];
        if (sort === 'name_asc') order = [['name', 'ASC']];

        const products = await Product.findAll({
            where: query,
            order: order,
            include: [{
                model: Farmer,
                as: 'farmer',
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }]
            }]
        });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Farmer,
                as: 'farmer',
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }]
            }]
        });

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post('/', async (req, res) => {
    const { farmer, name, description, price, category, image, stock, freshness } = req.body;

    try {
        const newProduct = await Product.create({
            farmerId: farmer,
            name,
            description,
            price,
            category,
            image,
            stock,
            freshness
        });

        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
