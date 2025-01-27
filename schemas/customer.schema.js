const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(10).max(30);
const lastName = Joi.string().min(10).max(30);
const address = Joi.string().min(10).max(40);
const phone = Joi.string().min(10).max(10);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(10);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  address: address.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  id,
  name,
  lastName,
  address,
  phone,
  userId,
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
