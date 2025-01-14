const express = require('express');

const ProductsService = require('../services/product.service');


const router = express.Router();
const productsService  = new ProductsService();

router.get('/', async(req, res) => {
  const products = await productsService.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.status(200).send('Yo soy un filter');
})

router.get('/:id', async(req,res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async(req, res) => {
  const body = req.body;
  const product = await productsService.create(body);
  res.status(201).json({message: 'Created', data: product});
});

router.patch('/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productsService.update(id, body);
    res.status(200).json({message: 'Update', data: product});
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const product = await productsService.delete(id);

  res.status(200).json({message: 'deleted', id: id});
})

module.exports = router;
