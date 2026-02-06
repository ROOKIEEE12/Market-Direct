const { sequelize, User, Farmer, Product } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        console.log('Syncing database...');
        // Force: true drops the tables and re-creates them
        await sequelize.sync({ force: true });
        console.log('Database Cleared');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create User
        console.log('Creating User...');
        const user = await User.create({
            name: 'Ramesh Patil',
            email: 'ramesh@farm.com',
            password: hashedPassword,
            role: 'farmer',
            location: 'Nashik, Maharashtra'
        });

        // Create Farmer Profile
        console.log('Creating Farmer Profile...');
        const farmer = await Farmer.create({
            userId: user.id,
            bio: 'Farming for 20 years. Known for his sweet winter carrots and chemical-free spinach.',
            specialty: 'Vegetable Specialist',
            experience: '20 Years',
            location: 'Nashik',
            image: 'https://picsum.photos/seed/farmer1/800/600'
        });

        // Create Products
        console.log('Creating Products...');
        const products = [
            { farmerId: farmer.id, name: 'Organic Carrots', description: 'Sweet and crunchy winter carrots.', price: 40, unit: 'kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000', stock: 100, freshness: 'Freshly Harvested' },
            { farmerId: farmer.id, name: 'Fresh Spinach', description: 'Fresh green spinach leaves.', price: 30, unit: 'bundle', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000', stock: 50, freshness: 'Freshly Harvested' },
            { farmerId: farmer.id, name: 'Sweet Strawberries', description: 'Juicy red strawberries.', price: 120, unit: 'box', category: 'Fruits', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4f47dc?q=80&w=600', stock: 30, freshness: 'Freshly Harvested' },
            { farmerId: farmer.id, name: 'Forest Honey', description: 'Pure organic honey from the forest.', price: 350, unit: 'jar', category: 'Honey', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600', stock: 20, freshness: 'Pure' }
        ];

        await Product.bulkCreate(products);

        console.log('Database Seeded Successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedDatabase();
