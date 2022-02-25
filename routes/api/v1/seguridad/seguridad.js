const express = require('express');
const router = express.Router();
const Usuarios = require('../../../../dao/usuarios/usuarios.model')
const usuariosModel = new Usuarios();
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res)=>{
  try {
    const {email, password} = req.body;
    // TODO: Realizar validaciones de entrada de datos
    if (await usuariosModel.validatePasswordAndUser(password, email) === true) {
      let rslt = await usuariosModel.new(email, password);
      res.status(200).json({status: 'Success', result: rslt});
    } else {
      res.status(400).json({status: 'Failed', error:3})
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json({status:'Failed'})
  }
});

router.post('/login', async (req, res)=>{
  try{
    const {email, password} = req.body;
    let userInDb = await usuariosModel.getByEmail(email);
    if (userInDb) {
      const isPasswordValid = await usuariosModel.comparePassword(password, userInDb.password);
      if (isPasswordValid) {
        const {email, roles, _id} = userInDb;
        const payload = {
          jwt: jwt.sign({email, roles, _id}, process.env.JWT_SECRET),
          user: {email, roles, _id}
        }
        res.status(200).json(payload);
      } else {
        res.status(400).json({status:'Failed', error: 2})
      }
    }else{
      res.status(400).json({status:'Failed', error: 1})
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json({status:'Failed'})
  }
});


module.exports = router;