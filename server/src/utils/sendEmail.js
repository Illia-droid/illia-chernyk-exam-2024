const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'moderatortest@ukr.net',
    pass: 'cGt8nLDCeDT2nuMV',
  },
});

module.exports.sendEmail = async ({ status, email }) => {
  try {
    const info = await transporter.sendMail({
      from: 'moderatortest@ukr.net',
      to: email,
      subject: "Moderator's decision",
      text: `Your offer has been changed to ${status}`,
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

