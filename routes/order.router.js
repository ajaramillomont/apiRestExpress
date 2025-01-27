const express = require('express');
const OrderService = require('../services/order.service');
const validatorsHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const ordersService = new OrderService();

router.get('/', async(req, res)=> {
  const orders = await ordersService.find();
  res.json(orders);
})

router.get('/:id',
  validatorsHandler(getOrderSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await ordersService.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorsHandler(createOrderSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await ordersService.create(body);
      res.status(201).json(newOrder);
    }catch(error) {
      next(error);
    }
  });

router.post('/add-item',
  validatorsHandler(addItemSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newItem = await ordersService.addItem(body);
      res.status(201).json(newItem);
    }catch(error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorsHandler(getOrderSchema, 'params'),
  async(req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const order = await ordersService.update(id, body);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
});

router.delete('/:id',
  validatorsHandler(getOrderSchema, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const user = await ordersService.delete(id);
      res.status(200).json({message: 'deleted', data: user});
    } catch (error) {
      next(error);
    }
});

module.exports = router;
