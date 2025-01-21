const { User, UserSchema} = require('./user.model.js');
const { Customer, CustomerSchema} = require('./customer.model.js');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
}

module.exports = setupModels;
