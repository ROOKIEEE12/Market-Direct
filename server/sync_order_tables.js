const { sequelize, Order, OrderItem } = require('./models');

async function syncOrderTables() {
    try {
        console.log('Syncing Order and OrderItem tables...');

        // Sync Order table
        await Order.sync({ alter: true });
        console.log('✓ Order table synced');

        // Sync OrderItem table
        await OrderItem.sync({ alter: true });
        console.log('✓ OrderItem table synced');

        console.log('All order tables synced successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error syncing tables:', err);
        process.exit(1);
    }
}

syncOrderTables();
