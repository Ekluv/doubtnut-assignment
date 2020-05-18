const config = require('dotenv').config();

if (config.error) {
  throw config.error;
}

const mongoose = require('mongoose');

const app = require('./app');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT || 3000);
