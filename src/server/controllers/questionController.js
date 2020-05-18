const mongoose = require('mongoose');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const UserAskedQuestion = mongoose.model('UserAskedQuestion');
const MailRequest = mongoose.model('MailRequest');

class QuestionController {
  static async askQuestion(ctx) {
    const { body: reqBody } = ctx.request;
    ctx.validateParams({ question: 'string' }, reqBody);
    const userAskedQues = await UserAskedQuestion.create({ question: reqBody.question });
    const mailReq = await MailRequest.findOne({ userId: ctx.user._id, isMailSent: false });
    if (mailReq) {
      mailReq.set({ questionId: userAskedQues.id });
      await mailReq.save();
    } else {
      await MailRequest.create({ questionId: userAskedQues.id, userId: ctx.user._id });
    }
    ctx.body = { msg: 'You will receive mail after 5 min of inactivity' };
  }
}

module.exports = QuestionController;
