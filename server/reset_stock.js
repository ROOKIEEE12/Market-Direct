const { Product } = require('./models');

async function resetStock() {
    try {
        console.log('Checking and resetting product stock...\n');

        const products = await Product.findAll();

        console.log('Current Stock Status:');
        console.log('---');

        for (const product of products) {
            console.log(`${product.name}: ${product.stock} units`);

            // Reset stock to a good amount
            product.stock = 100;
            await product.save();
        }

        console.log('\n✓ All products stock reset to 100 units!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

resetStock();
