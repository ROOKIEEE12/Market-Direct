const { User } = require('./models');
const bcrypt = require('bcryptjs');

async function createConsumer() {
    try {
        console.log('Creating consumer user...');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const consumer = await User.create({
            name: 'Amit Kumar',
            email: 'amit@consumer.com',
            password: hashedPassword,
            role: 'consumer',
            location: 'Mumbai, Maharashtra'
        });

        console.log('✓ Consumer created successfully!');
        console.log(`  ID: ${consumer.id}`);
        console.log(`  Name: ${consumer.name}`);
        console.log(`  Email: ${consumer.email}`);
        console.log(`  Password: password123`);
        console.log('\nYou can now login with:');
        console.log('  Email: amit@consumer.com');
        console.log('  Password: password123');

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

createConsumer();
