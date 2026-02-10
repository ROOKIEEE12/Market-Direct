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
            { farmerId: farmer.id, name: 'Premium Kashmiri Saffron', description: 'Highest grade Kashmiri Kesar, hand-picked from the fields of Pampore. Pure and aromatic.', price: 350, unit: 'gram', category: 'Honey', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800', stock: 50, freshness: 'Pure' },
            { farmerId: farmer.id, name: 'Alphonso Mangoes', description: 'The king of mangoes from Ratnagiri. Naturally ripened and incredibly sweet.', price: 1200, unit: 'dozen', category: 'Fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800', stock: 100, freshness: 'Naturally Ripened' },
            { farmerId: farmer.id, name: 'Organic Broccoli', description: 'Freshly harvested organic broccoli. Rich in Vitamin C and fiber.', price: 85, unit: 'pc', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1458819714733-e5ab3d536722?q=80&w=800', stock: 60, freshness: 'Fresh' },
            { farmerId: farmer.id, name: 'Wild Forest Honey', description: 'Raw, unprocessed honey collected from deep forest beehives. Zero added sugar.', price: 450, unit: '500g', category: 'Honey', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800', stock: 30, freshness: 'Raw' },
            { farmerId: farmer.id, name: 'High-Protein Quinoa', description: 'Nutrient-dense organic quinoa. Perfect for healthy salads and meals.', price: 299, unit: 'kg', category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800', stock: 80, freshness: 'Organic' },
            { farmerId: farmer.id, name: 'Hass Avocados', description: 'Creamy and buttery Hass avocados. Excellent for guacamole or morning toast.', price: 180, unit: 'pc', category: 'Fruits', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800', stock: 40, freshness: 'Fresh' },
            { farmerId: farmer.id, name: 'Red Cherry Tomatoes', description: 'Sweet and tangy cherry tomatoes. Perfect for salads and pasta.', price: 60, unit: 'box', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f02bc6834?q=80&w=800', stock: 100, freshness: 'Fresh' },
            { farmerId: farmer.id, name: 'Fresh Desi Ghee', description: 'Pure A2 cow milk ghee made using the traditional Bilona method.', price: 850, unit: 'kg', category: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-125581cc2532?q=80&w=800', stock: 25, freshness: 'Pure' },
            { farmerId: farmer.id, name: 'Organic Spinach', description: 'Iron-rich fresh green spinach. Grown without any chemical pesticides.', price: 40, unit: 'bundle', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800', stock: 50, freshness: 'Fresh' }
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
