require('dotenv').config();
const getDb = require('../dao/mongodb');

const names = [
    'Fulano',
    'Mengano',
    'Sutanito',
    'Lulu',
    'Paco',
    'Hugo',
    'Juan',
    'Luis',
];

const surnames = [
    'McQuack',
    'Rico',
    'Dtal',
    'De santa',
    'Martinez',
    'Araya',
    'Cabildo',
    'Chavez'
];

const pacientes = 50;
const pacientesArr = [];

for(var i = 0; i < pacientes; i++){
    const año = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5, '0');
    const nombres = names[Math.floor(Math.random() * 8)];
    const apellidos = surnames[Math.floor(Math.random() * 8)];
    const email = (`${nombres}.${apellidos}@unmail.com`).toLowerCase();
    const telefono = `${(20000000 + Math.floor(Math.random() * 10000000))}`;
    const doc = {
        nombres,
        apellidos,
        identidad: `0801${año}${secuencia}`,
        telefono,
        email
    };
    pacientesArr.push(doc);
}

getDb().then(
    (db)=>{
        const pacientes = db.collection('Pacientes');
        pacientes.insertMany(pacientesArr, (err, rslts)=>{
            if(err) {
                console.error(err);
                return;
            }
            console.log(rslts);
            return;
        })
    }
)