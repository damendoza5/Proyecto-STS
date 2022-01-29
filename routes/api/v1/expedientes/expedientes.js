const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedientesModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022,0,20,18,41),
    });
});

router.post('/new', async (req, res) => {
    const { identidad, descripcion, observacion } = req.body;
    let fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let ultimaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
    result = await expedientesModel.new(identidad, fecha, descripcion, observacion, ultimaActualizacion);
      res.status(200).json(
          {
          status: 'ok',
          result: result
      });
      } catch (ex) {
          console.log(ex);
          res.status(500).json({
              status: 'failed',
              result: {}
          });
      }
});

router.get('/all', async (req, res) => {
    try {
        const rows = await expedientesModel.getAll();
        res.status(200).json({status:'ok', expedientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const { identidad, descripcion, observacion } = req.body;
        const { id } = req.params;
        let ultimaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const rslt = await expedientesModel.updateExp(identidad, descripcion, observacion, ultimaActualizacion, id);
        res.status(200).json({
            status: 'ok',
            rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' })
    }
});

router.get('/byid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await expedientesModel.getbyId(parseInt(id));
        res.status(200).json({status:'ok', pacientes: row});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const rslt = await expedientesModel.deleteExp(parseInt(id));
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