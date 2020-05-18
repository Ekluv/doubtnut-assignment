const mongoose = require('mongoose');
const Model = require('./base');

const validateEmail = value => /^(?=.{6,254}$)[A-Za-z0-9_\-\.]{1,64}\@[A-Za-z0-9_\-\.]+\.[A-Za-z]{2,}$/.test(value);

class User extends Model {}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Invalid Email'],
  },
  lastActivityAt: {
    type: Date,
    default: new Date(),
  }
}, {
  timestamps: true,
});

UserSchema.loadClass(User);
module.exports = mongoose.model('User', UserSchema);
