const getDb = require('../mongodb');
let db = null;

class Pacientes {
    collection = null;
    constructor() {
        getDb()
        .then( (database) => {
          db = database;
          collection = db.collection('proyectoSTS');
          if (process.env.MIGRATE === 'true') {
            const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
            db.run(createStatement);
          }
        })
        .catch((err) => { console.error(err)});
      }
    
      new ( nombres, apellidos, identidad, telefono, email) {
        return new Promise( (accept, reject)=> {
          db.run(
            'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
            [identidad, nombres, apellidos, email, telefono],
            (err, rslt)=>{
              if(err) {
                console.error(err);
                reject(err);
              }
              accept(this.lastID());
              console.log(rslt);
            }
          );
        });
      }
    
      getAll () {
          return new Promise ( (accept, reject) => {
              db.all('SELECT * FROM pacientes;', (err, rows) => {
                  if (err) {
                      console.error(err);
                      reject(err);
                  } else {
                      accept(rows);
                  }
              });
          });
      }
    
      getbyId (id) {
        return new Promise ( (accept, reject) => {
            db.get('SELECT * FROM pacientes WHERE id=?;',
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
    
      updateOne (nombres, apellidos, telefono, identidad, email, id) {
        return new Promise ( (accept, reject) => {
          const sqlUpdate = 'UPDATE pacientes set nombre = ?, apellidos =?, telefono=?, identidad=?, email=? WHERE id=?;';
          db.run(
            sqlUpdate,
            [nombres, apellidos, telefono, identidad, email, id],
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
    
      deleteOne (id) {
        return new Promise ( (accept, reject) => {
          const sqlDelete = 'DELETE FROM pacientes WHERE id=?;';
          db.run(
            sqlDelete,
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
    
module.exports = Pacientes;