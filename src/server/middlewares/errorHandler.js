const httpStatus = require('http-status');

/**
 * middleware function for request error handling
 * @param  {Object}   ctx  koa context
 * @param  {Function} next middleware
 * @return {undefined}
 */
async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    if (ctx.status === httpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        ctx.body = { error: 'Internal Server Error' };
        ctx.type = 'json';
      } else {
        ctx.body = err.stack;
      }
    } else {
      ctx.body = err.message;
      ctx.type = 'json';
    }
    ctx.app.emit('error', err, ctx);
  }
}

module.exports = errorHandler;
