const { sequelize } = require('../config/database');
const createUserModel = require('./user.model');
const createOrderModel = require('./order.model');

const User = createUserModel(sequelize);
const Order = createOrderModel(sequelize);

User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'pedidos',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'usuario'
});

module.exports = {
  sequelize,
  User,
  Order
};
