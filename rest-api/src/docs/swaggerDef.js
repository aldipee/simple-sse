const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `Aldi's Playgrounds API documentation`,
    version,
  
  },
  servers: [
    {
      url: `http://code.aldipee.com/api/v1/docs`,
    },
  ],
};

module.exports = swaggerDef;
