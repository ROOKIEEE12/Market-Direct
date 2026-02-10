const axios = require('axios');

async function testCheckout() {
    try {
        console.log('Testing checkout flow...\n');

        // First, login to get a token
        console.log('1. Logging in as Ramesh...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'ramesh@farm.com',
            password: 'password123'
        });

        const token = loginRes.data.token;
        console.log('✓ Login successful, token received\n');

        // Get products
        console.log('2. Fetching products...');
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const products = productsRes.data;
        console.log(`✓ Found ${products.length} products\n`);

        if (products.length === 0) {
            console.log('No products found. Please run seed_pg.js first.');
            process.exit(1);
        }

        // Create test order
        console.log('3. Creating test order...');
        const orderRes = await axios.post('http://localhost:5000/api/orders', {
            items: [
                { id: products[0].id, quantity: 2 },
                { id: products[1].id, quantity: 1 }
            ],
            totalAmount: (products[0].price * 2) + products[1].price,
            shippingAddress: {
                name: 'Test User',
                address: '123 Test Street',
                city: 'Mumbai',
                zip: '400001',
                phone: '+91 9876543210'
            }
        }, {
            headers: { 'x-auth-token': token }
        });

        console.log('✓ Order created successfully!');
        console.log(`  Order ID: ${orderRes.data.orderId}`);
        console.log(`  Message: ${orderRes.data.msg}\n`);

        console.log('✅ All tests passed! Checkout is working correctly.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Test failed:', err.response?.data || err.message);
        process.exit(1);
    }
}

testCheckout();
