const getDb = require('../mongodb');
let db = null;
class Pacientes {
  collection = null;
  constructor() {
    getDb()
    .then( (database) => {
      db = database;
      this.collection = db.collection('Pacientes');
      if (process.env.MIGRATE === 'true') {
        
      }
    })
    .catch((err) => { console.error(err)});
  }

  async new ( nombres, apellidos, identidad, telefono, email) {
    const newPaciente = {
      nombres, 
      apellidos, 
      identidad, 
      telefono,
      email
    };
    const result = await this.collection.insertOne(newPaciente);
    return result;
  }

  getAll () {

  }

  getbyId (id) {

  }

  updateOne (nombres, apellidos, telefono, identidad, email, id) {

  }

  deleteOne (id) {

  }

}

module.exports = Pacientes;