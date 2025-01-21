const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(10).max(30);
const lastName = Joi.string().min(10).max(30);
const address = Joi.string().min(10).max(40);
const phone = Joi.string().min(10).max(10);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  address: address.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  address: address,
  phone: phone
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
