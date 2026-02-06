const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User, Farmer } = require('../models'); // Adjust path based on your structure
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// @route   POST api/orders
// @desc    Create a new order (Checkout)
// @access  Private
router.post('/', auth, async (req, res) => {
    const { items, totalAmount } = req.body; // items: [{ productId, quantity }]

    try {
        // 1. Create the Order
        const order = await Order.create({
            consumerId: req.user.id,
            totalAmount,
            status: 'pending'
        });

        // 2. Create OrderItems & Update Stock
        for (const item of items) {
            const product = await Product.findByPk(item.id);

            if (!product) {
                return res.status(404).json({ msg: `Product ${item.id} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ msg: `Insufficient stock for ${product.name}` });
            }

            // Create OrderItem association
            await OrderItem.create({
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                priceAtPurchase: product.price // Good practice to store historical price
            });

            // Update Stock
            product.stock -= item.quantity;
            await product.save();
        }

        res.json({ msg: 'Order placed successfully', orderId: order.id });
    } catch (err) {
        console.error('Order Error:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/orders/my-orders
// @desc    Get logged in user's orders (Consumer view)
// @access  Private
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { consumerId: req.user.id },
            include: [
                {
                    model: Product,
                    as: 'products',
                    through: { attributes: ['quantity'] } // Include quantity from OrderItem
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/orders/farmer-orders
// @desc    Get orders containing products from the logged-in farmer
// @access  Private (Farmer only)
router.get('/farmer-orders', auth, async (req, res) => {
    try {
        // First find the farmer profile for this user
        const farmer = await Farmer.findOne({ where: { userId: req.user.id } });
        if (!farmer) return res.status(403).json({ msg: 'Not authorized as a farmer' });

        // Complex query: Find orders that have products belonging to this farmer
        // This usually requires a more advanced query or filtering in code for simple setups.
        // For efficiency in a real app, we'd query OrderItems directly including Order and Product.

        const orderItems = await OrderItem.findAll({
            include: [
                {
                    model: Product,
                    where: { farmerId: farmer.id }, // Filter by this farmer's products
                    attributes: ['name', 'price', 'image']
                },
                {
                    model: Order,
                    include: [{ model: User, as: 'consumer', attributes: ['name', 'email', 'location'] }]
                }
            ],
            order: [[Order, 'createdAt', 'DESC']]
        });

        // Group by Order if needed, or send flat list of items to fulfill
        res.json(orderItems);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin or relevant Farmer - simplified for now)
router.put('/:id/status', auth, async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
