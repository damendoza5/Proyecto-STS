const getDb = require('../db');
let db = null;

class Expedientes {

    constructor() {
        getDb()
        .then( (database) => {
          db = database;
          if (process.env.MIGRATE === 'true') {
            const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, ultimaActualizacion TEXT);';
            db.run(createStatement);
          }
        })
        .catch((err) => { console.error(err)});
    }

    new ( identidad, fecha, descripcion, observacion, ultimaActualizacion) {
        return new Promise( (accept, reject)=> {
          db.run(
            'INSERT INTO expedientes (identidad, fecha, descripcion, observacion, ultimaActualizacion) VALUES (?, ?, ?, ?, ?);',
            [identidad, fecha, descripcion, observacion, ultimaActualizacion],
            (err, result)=>{
              if(err) {
                console.error(err);
                reject(err);
              }
              accept(result);
            }
          );
        });
    }

    getAll () {
        return new Promise ( (accept, reject) => {
            db.all('SELECT * FROM expedientes;', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(rows);
                }
            });
        });
    }

    updateExp (identidad, descripcion, observacion, ultimaActualizacion, id) {
        return new Promise ( (accept, reject) =>{
            const updateQuery = 'UPDATE expedientes set identidad = ?, descripcion =?, observacion=?, ultimaActualizacion=? WHERE id=?;';
            db.run(
                updateQuery,
                [identidad, descripcion, observacion, ultimaActualizacion, id],
                function (err) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }else{
                        accept(this);
                    }
                }
            );
        });
    }

    getbyId (id) {
        return new Promise ( (accept, reject) => {
            db.get('SELECT * FROM expedientes WHERE id=?;',
            [id],
            (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(row);
                }
            });
        });
    }

    deleteExp (id) {
        return new Promise ( (accept, reject) => {
          const deleteQuery = 'DELETE FROM expedientes WHERE id=?;';
          db.run(
            deleteQuery,
            [id],
            function (err) {
              if (err) {
                console.error(err);
                reject(err);
              }else{
                accept(this);
              }
            }
          );
        });
    }

}

module.exports = Expedientes;