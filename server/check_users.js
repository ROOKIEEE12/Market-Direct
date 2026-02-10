const { User, Farmer } = require('./models');

async function checkUsers() {
    try {
        const users = await User.findAll({
            include: [{ model: Farmer, as: 'farmerProfile' }]
        });

        console.log(`Found ${users.length} users:\n`);
        users.forEach(user => {
            console.log(`ID: ${user.id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log('---');
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUsers();
