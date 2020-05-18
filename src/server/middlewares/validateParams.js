const httpStatus = require('http-status');

/**
 * Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * Example rule => {
 *   name: 'string',
 *   choice: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: true },
 * }
 *
 * @param {Object} rules
 * @returns A validation middleware function.
 */

function validateParams(ctx, next) {
  ctx.validateParams = (rules, data, { throwError = true } = {}) => {
    const errors = ctx.app.validator.validate(rules, data);
    if (errors && throwError) {
      ctx.throw(httpStatus.UNPROCESSABLE_ENTITY, JSON.stringify(errors));
    }
    return errors;
  };
  return next();
}

module.exports = validateParams;
