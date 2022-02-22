const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;

class Expedientes {
    collection = null;
    constructor() {
        getDb()
        .then( (database) => {
          db = database;
          this.collection = db.collection('Expedientes');
          if (process.env.MIGRATE === 'true') {

          }
        })
        .catch((err) => { console.error(err)});
    }

    async new ( identidad, fecha, descripcion, observacion, ultimaActualizacion) {
        const nuevoExpediente = {
            identidad, 
            fecha, 
            descripcion, 
            observacion, 
            ultimaActualizacion
          };
          const rslt = await this.collection.insertOne(nuevoExpediente);
          return rslt;
    }

    async getAll () {
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getFaceted(page, items, filter = {}) {
        const cursor = this.collection.find(filter);
        const totalItems = await cursor.count();
        cursor.skip((page -1) * items);
        cursor.limit(items);
        const resultados = await cursor.toArray();
        return {
          totalItems,
          page,
          items,
          totalPages: (Math.ceil(totalItems / items)),
          resultados
        };
    }

    async updateExp (id, identidad, descripcion, observacion, ultimaActualizacion) {
        const filter = {_id: new ObjectId(id)};
        const updateCmd = {
        '$set':{
            identidad,
            descripcion,
            observacion,
            ultimaActualizacion
        }
    };
    return await this.collection.updateOne(filter, updateCmd);
    }

    async getbyId (id) {
        const _id = new ObjectId(id);
        const filter = {_id};
        console.log(filter);
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    async updateAddTag(id, tagEntry){
        const updateCmd = {
          "$push": {
            tags: tagEntry
          }
        }
        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
      }
    
      async updateAddTagSet(id, tagEntry){
        const updateCmd = {
          "$addToSet": {
            tags: tagEntry
          }
        }
        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
      }

    async deleteExp (id) {

    }

}

module.exports = Expedientes;