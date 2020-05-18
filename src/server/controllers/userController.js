const mongoose = require('mongoose');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

class UserController {
  static async findOrCreate(ctx) {
    const { body: reqBody } = ctx.request;
    ctx.validateParams({ email: 'email' }, reqBody);
    const user = await User.findOrCreate({ email: reqBody.email });
    const token = jwt.sign({
      data: { user },
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
    ctx.body = { token };
  }

}

module.exports = UserController;
