const express = require('express')
const userServices = require('../services/userServices')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const data = await userServices.getAllUsers();
      res.status(200).send(data);
    }
    catch (e) {
     console.log(e)
     res.status(500).send({message:e?.message});
    }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body; 
    const data = await userServices.createUser( body);
    res.status(200).send({message:'customer created successfully'});
  }
  catch (e) {
   console.log(e)
   res.status(500).send({message:e?.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    let id = req.params.id
    let body = req.body 
    const data = await userServices.updateUser(id, body);
    res.status(200).send({message:'customer updated successfully'});
  }
  catch (e) {
   console.log(e)
   res.status(500).send({message:e?.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id
    const data = await userServices.deleteUser(id);
    res.status(200).send({message:'customer deleted successfully'});
  }
  catch (e) {
   console.log(e)
   res.status(500).send({message:e?.message});
  }
});


module.exports = router;