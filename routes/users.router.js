const express = require('express');
const UsersService = require('../services/user.service');

const router = express.Router();

const usersService = new UsersService();

router.get('/', async(req, res)=> {
  const users = await usersService.find();
  res.json(users);
})

router.get('/:id', async(req, res) => {
  const {id} = req.params;
  const users = await usersService.findOne(id);
  res.json(users);
})

router.post('/', async(req, res) => {
  const body = req.body;
  const user = await usersService.create(body);
  res.status(201).json({message: 'Created', data: user});
});

router.patch('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await usersService.update(id, body);
    res.status(200).json({message: 'Updated!', data: user});
  } catch (error) {
    res.status(404).json({message: error.message})

  }
})

router.delete('/:id', async(req, res) => {
  const {id} = req.params;
  const user = await usersService.delete(id);
  res.status(200).json({message: 'deleted', data: user});
})

module.exports = router;
