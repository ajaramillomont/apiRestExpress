const express = require('express');
const UsersService = require('../services/user.service');
const validatorsHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema}  = require('../schemas/user.schema');
const { valid } = require('joi');

const router = express.Router();

const usersService = new UsersService();

router.get('/', async(req, res)=> {
  const users = await usersService.find();
  res.json(users);
})

router.get('/:id',
  validatorsHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
})

router.post('/',
  validatorsHandler(createUserSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newUser = await usersService.create(body);
      res.status(201).json(newUser);
    }catch(error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorsHandler(getUserSchema, 'params'),
  async(req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await usersService.update(id, body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

router.delete('/:id',
  validatorsHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const user = await usersService.delete(id);
      res.status(200).json({message: 'deleted', data: user});
    } catch (error) {
      next(error);
    }
})

module.exports = router;
