const mongoose = require('mongoose');
const Model = require('./base');

const validateEmail = value => /^(?=.{6,254}$)[A-Za-z0-9_\-\.]{1,64}\@[A-Za-z0-9_\-\.]+\.[A-Za-z]{2,}$/.test(value);

class UserAskedQuestion extends Model {}

const UserAskedQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

UserAskedQuestionSchema.loadClass(UserAskedQuestion);
module.exports = mongoose.model('UserAskedQuestion', UserAskedQuestionSchema);
