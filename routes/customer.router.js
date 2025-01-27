const expres = require('express');
const CustomersService = require('../services/customer.service');

const validatorsHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');

const { valid } = require('joi');

const router = expres.Router();

const customersService = new CustomersService();

router.get('/', async(req, res) => {
  const customers = await customersService.find();
  res.json(customers);
});

router.get('/:id',
  validatorsHandler(getCustomerSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customersService.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorsHandler(createCustomerSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await customersService.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorsHandler(updateCustomerSchema, 'params'),
  async(req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await customersService.update(id, body);
      res.status(200).json(customer);
    } catch (error) {
      res.status(404).json({message: error.message});
    }
  }
);

router.delete('/:id',
  validatorsHandler(getCustomerSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const customer = customersService.delete(id);
      res.status(200).json({message: 'deleted', data: customer});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;


