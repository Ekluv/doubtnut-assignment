/**
 * Now you can run command
 * $ npm run console
 * app > // Here we have all sequelize models
 * app > await Model.findOne() // return {..obj} json object
 */

let repl = require('repl');
const mongoose = require('mongoose');
const config = require('dotenv').config();

const models = require('./src/server/models');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName];
});


let replServer = repl.start({
  prompt: 'app > '
});

replServer.context.db = models;
