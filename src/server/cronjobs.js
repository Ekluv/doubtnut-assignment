const cron = require('node-cron');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const MailRequest = mongoose.model('MailRequest');

const PdfService = require('./services/PdfService');
const EmailService = require('./services/EmailService');

const domain = 'http://localhost:3000';

cron.schedule('*/1 * * * *', async () => {
  const time = dayjs().subtract(5, 'm').toDate();
  const requests = await MailRequest.find({ isMailSent: false, createdAt: { $lte: time } })
    .populate('questionId')
    .populate('userId');
  requests.forEach(async (req) => {
    const { userId: user, questionId: ques } = req;
    const filename = await PdfService.generatePdf(ques.question);
    const { success } = await EmailService.sendMail({
      to: user.email,
      html: `${ques.question}<a href="${domain}/${filename}">${domain}/${filename}</a>`,
    });
    console.log('email sent to user', user.email, 'success:', success);
    await req.updateOne({ isMailSent: success });;
  });
});
