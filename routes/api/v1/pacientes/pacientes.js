const express = require('express');
const router = express.Router();

const Pacientes = new require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Pacientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Pacientes',
      updates: new Date(2022,0,19,18,41,00)
    }
  );
}); //GET /

router.get('/all', async (req, res) => {
    try {
        const rows = await pacienteModel.getAll();
        res.status(200).json({status:'ok', pacientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
    }
});

router.get('/byid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await pacienteModel.getbyId(parseInt(id));
        res.status(200).json({status:'ok', pacientes: row});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
    }
});

router.get('/byemailname/:email/:name', async (req, res) => {
    try {
        const { email, name } = req.params;
        const rows = await pacienteModel.getbyEmailName();
        res.status(200).json({status:'ok', pacientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
    }
});

router.post('/new', async (req, res) => {
  const { nombres, apellidos, identidad, email, telefono } = req.body;
  try {
  rslt = await pacienteModel.new(nombres, apellidos, identidad, telefono, email);
    res.status(200).json(
        {
        status: 'ok',
        result: rslt
    });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            status: 'failed',
            result: {}
        });
    }
}); //POST /new


//router.post();
//router.put();
router.put('/update/:id', async (req, res) => {
    try{
        const { nombres, apellidos, identidad, email, telefono } = req.body;
        const { id } = req.params;
        const rslt = await pacienteModel.updateOne(nombres, apellidos, identidad, telefono, email, id);
        res.status(200).json({
            status: 'ok',
            rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' })
    }
});
//router.delete();
router.delete('/delete/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const rslt = await pacienteModel.deleteOne(id);
        res.status(200).json({
            status: 'ok',
            rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' })
    }
});


module.exports = router;