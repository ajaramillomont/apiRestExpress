const express = require('express');

const ProductsService = require('../services/product.service');
const validatorsHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}  = require('../schemas/product.schema');


const router = express.Router();
const productsService  = new ProductsService();

router.get('/',
  validatorsHandler(queryProductSchema, 'query'),
  async(req, res, next) => {
    try {
      const products = await productsService.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
});

router.get('/filter', (req, res) => {
  res.status(200).send('Yo soy un filter');
})

router.get('/:id',
  validatorsHandler(getProductSchema, 'params'),
  async(req,res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorsHandler(createProductSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await productsService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  validatorsHandler(getProductSchema, 'params'),
  validatorsHandler(updateProductSchema, 'body'),
  async(req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productsService.update(id, body);
    res.status(200).json({message: 'Update', data: product});
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorsHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.delete(id);
      res.status(200).json({message: 'deleted', data: product})
    } catch (error) {
      next(error);
    }
})

module.exports = router;
