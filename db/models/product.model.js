const { allow } = require('joi');
const { Model, DataTypes, Sequelize, HasMany } = require('sequelize');

const { CATEGORY_TABLE } = require('../models/category.model');

const PRODUCT_TABLE = 'products';

//esquema
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  price: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },

  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },

  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
