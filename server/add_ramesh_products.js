const { User, Farmer, Product } = require('./models');

async function addProducts() {
    try {
        const ramesh = await User.findOne({ where: { email: 'ramesh@farm.com' } });
        if (!ramesh) {
            console.error('Ramesh Patil not found. Please run seed_pg.js first.');
            process.exit(1);
        }

        const farmer = await Farmer.findOne({ where: { userId: ramesh.id } });
        if (!farmer) {
            console.error('Farmer profile for Ramesh not found.');
            process.exit(1);
        }

        const products = [
            {
                farmerId: farmer.id,
                name: 'Organic Red Onions (Nashik)',
                description: 'Famous Nashik red onions, known for their sharp flavor and long shelf life. Grown organically by Ramesh Patil.',
                price: 35,
                unit: 'kg',
                category: 'Vegetables',
                image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800',
                stock: 500,
                freshness: 'Freshly Harvested'
            },
            {
                farmerId: farmer.id,
                name: 'Nashik Valley Grapes',
                description: 'Export-quality green seedless grapes from the heart of Nashik valley. Extremely sweet and juicy.',
                price: 120,
                unit: 'kg',
                category: 'Fruits',
                image: 'https://images.unsplash.com/photo-1537640538966-79f369b41f8f?q=80&w=800',
                stock: 100,
                freshness: 'Morning Harvest'
            },
            {
                farmerId: farmer.id,
                name: 'Golden Wheat Flour',
                description: 'Stone-ground whole wheat flour (Atta). Full of fiber and nutrients. No additives.',
                price: 55,
                unit: 'kg',
                category: 'Grains',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800',
                stock: 200,
                freshness: 'Freshly Ground'
            }
        ];

        for (const p of products) {
            const [product, created] = await Product.findOrCreate({
                where: { name: p.name, farmerId: farmer.id },
                defaults: p
            });
            if (created) {
                console.log(`Added: ${p.name}`);
            } else {
                console.log(`Already exists: ${p.name}`);
            }
        }

        console.log('Successfully added Ramesh Patil\'s products!');
        process.exit(0);
    } catch (err) {
        console.error('Error adding products:', err);
        process.exit(1);
    }
}

addProducts();
