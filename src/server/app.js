const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const send = require('koa-send');
const Parameter = require('parameter');

const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const validateParams = require('./middlewares/validateParams');

require('./models');
require('./routes');
require('./cronJobs');

const app = new Koa();
app.validator = new Parameter();

// external middlewares
app
  .use(mount('/files', serve('files')))
  .use(helmet())
  .use(logger())
  .use(errorHandler)
  .use(
    bodyParser({
      multipart: true,
    }),
  );

app
  .use(validateParams)
  .use(router.middleware())
  .use(router.allowedMethods());


module.exports = app;
