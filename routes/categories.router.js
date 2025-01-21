const express = require('express');
const CategoriesService = require('../services/category.service');
const validatorsHandler = require('../middlewares/validator.handler');
const { createCategorychema, updateCategorySchema, getCategorySchema } = require("../schemas/category.schema")

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

router.post('/',
  validatorsHandler(createCategorychema),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoryService.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

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
