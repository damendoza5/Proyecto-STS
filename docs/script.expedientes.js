require('dotenv').config();
const getDb = require('../dao/mongodb');
const expedientes = 50;

const observaciones = [
    'Una observacion 1.',
    'Una observacion 2.',
    'Una observacion 3.',
    'Una observacion 4.',
    'Una observacion 5.'
];

const descripciones = [
    'Una descripcion 1.',
    'Una descripcion 2.',
    'Una descripcion 3.',
    'Una descripcion 4.',
    'Una descripcion 5.',
];

const expedientesArr = [];

function randomDate(start, end){
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for(var i = 0; i < expedientes; i++){
    const año = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5, '0');
    const fecha = randomDate(new Date(1980, 0, 1), new Date()).toISOString().slice(0, 19).replace('T', ' ');
    const ultimaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const observacion = observaciones[Math.floor(Math.random() * 5)];
    const descripcion = descripciones[Math.floor(Math.random() * 5)];
    const doc = {
        identidad: `0801${año}${secuencia}`,
        fecha,
        observacion,
        descripcion,
        ultimaActualizacion
    };
    expedientesArr.push(doc);
}

getDb().then(
    (db)=>{
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedientesArr, (err, rslts)=>{
            if(err) {
                console.error(err);
                return;
            }
            console.log(rslts);
            return;
        })
    }
)