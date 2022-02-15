const ObjectId = require('mongodb').ObjectId;
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

  async getAll () {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;

  }

  async getbyId (id) {
    const _id = new ObjectId(id);
    const filter = { _id };
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne (nombres, apellidos, telefono, identidad, email, id) {
    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set': {
        nombres, 
        apellidos, 
        telefono, 
        identidad, 
        email
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  deleteOne (id) {

  }

}

module.exports = Pacientes;