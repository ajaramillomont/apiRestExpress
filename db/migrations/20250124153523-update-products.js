'use strict';

const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    })
  }
};
