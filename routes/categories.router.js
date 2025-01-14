const express = require('express');
const CategoriesService = require('../services/category.service');

const router = express.Router();

const categoryService = new CategoriesService();

router.get('/', async(req, res) => {
  const categories = await categoryService.find();
  res.json(categories);
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  const categories = await categoryService.findOne(id);
  res.json(categories);
})

router.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  const category = categoryService.create(body);
  res.status(201).json({message: 'Created', data: category});
})

router.patch('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await categoryService.update(id, body);
    res.status(200).json({message: 'Updated', id: id});
  } catch (error) {
    res.status(404).json({message: error.message})
  }
});

router.delete('/:id', async(req, res)=> {
  const { id } = req.params;
  await categoryService.delete(id);
  res.status(200).json({message: 'Deleted', id})
});

module.exports = router;
