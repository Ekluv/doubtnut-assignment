const mongoose = require('mongoose');
const Model = require('./base');

class MailRequest extends Model {}

const MailRequestSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAskedQuestion'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isMailSent: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

MailRequestSchema.loadClass(MailRequest);
module.exports = mongoose.model('MailRequest', MailRequestSchema);
