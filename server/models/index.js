const sequelize = require('../config/database');
const User = require('./User');
const Farmer = require('./Farmer');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// User Relationships
User.hasOne(Farmer, { foreignKey: 'userId', as: 'farmerProfile' });
Farmer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Farmer & Product Relationships
Farmer.hasMany(Product, { foreignKey: 'farmerId', as: 'products' });
Product.belongsTo(Farmer, { foreignKey: 'farmerId', as: 'farmer' });

// Order Relationships
User.hasMany(Order, { foreignKey: 'consumerId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'consumerId', as: 'consumer' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', as: 'products' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', as: 'orders' });

// Add direct associations for OrderItem to allow include queries
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    User,
    Farmer,
    Product,
    Order,
    OrderItem
};
