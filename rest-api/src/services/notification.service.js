const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((err) => {
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env');
      logger.info(err);
    });
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html, userFullName) => {
  const msg = {
    subject,
    html,
    priority: 'high',
    from: config.email.from,
    to,
    envelope: {
      from: 'Codespace aldipee.com <itsme@aldipee.com>',
      to: `${userFullName} <${to}>`,
    },
  };
  await transport.sendMail(msg);
};

module.exports = {
  sendEmail,
};
