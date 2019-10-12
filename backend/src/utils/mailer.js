const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f5952922f0fb96',
    pass: '1816e114ccd772',
  }
});

const sendMail = message => {
  return new Promise((resolve, reject) => {
    transport.sendMail(message, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

module.exports = { sendMail };