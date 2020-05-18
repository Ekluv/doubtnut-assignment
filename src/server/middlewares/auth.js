const mongoose = require('mongoose');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');


/**
 * middleware function jwt verification
 * @param  {Object}   ctx  koa context
 * @param  {Function} next middleware
 * @return {undefined}
 */
async function verifyJwt(ctx, next) {
  const { authorization: authToken } = ctx.request.headers;
  if (!authToken || !authToken.includes('JWT')) {
    ctx.throw(httpStatus.UNAUTHORIZED, JSON.stringify({ error: 'token missing' }));
  }
  try {
    const [, jwtoken] = authToken.split(' ');
    const { data: { user } } = jwt.verify(jwtoken, process.env.JWT_SECRET);
    ctx.user = user;
    await User.findAndUpdate(user._id, { lastActivityAt: new Date() });
  } catch (err) {
    ctx.throw(httpStatus.UNAUTHORIZED, JSON.stringify({ error: 'token invalid or expired' }));
  }
  return next();
}


module.exports = {
  verifyJwt,
};
