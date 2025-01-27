'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.removeConstraint(PRODUCT_TABLE, 'products_category_id_key')
  },

  async down (queryInterface) {
    await queryInterface.addConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'unique',
      name: 'products_category_id_key',
    })
  }
};
