const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const seed = require('seed-random');

const rng = Math.floor(seed(process.ppid)() * 2);
const DB_NAME = 'node_backend_tutorial' + '_test' + rng;
const OTHER_DB_NAME = 'node_backend_tutorial' + '_test' + (1 - rng);

//middleware
class ModelGenerator {
  constructor() {
    if (!mongoose.connection) throw new Error('Mongoose change API?');

    var c = mongoose.connection;
    if (!c.client || !c.client.db || !c.useDb)
      throw new Error('Mongoose change API?');

    this.connection = c.useDb(DB_NAME);
  }

  async generate(oldModel, data) {
    if (!oldModel.modelName || !oldModel.schema)
      throw new Error('Mongoose change API?');

    const newName = uuid().replace(/-/g, '') + oldModel.modelName;
    var newSchema = Object.assign(
      Object.create(Object.getPrototypeOf(oldModel.schema)),
      oldModel.schema
    );
    newSchema.options = Object.assign({}, newSchema.options, {
      collection: newName,
    });

    var model = this.connection.model(newName, newSchema);
    await model.ensureIndexes();
    if (data) await model.insertMany(data);
    return model;
  }

  async closeOther() {
    await mongoose.connection.client.db(OTHER_DB_NAME).dropDatabase();
  }
}

module.exports = ModelGenerator;
