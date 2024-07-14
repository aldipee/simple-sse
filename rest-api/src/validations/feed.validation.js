const Joi = require('joi');

const createNewFeed = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    cover_image: Joi.string().required(),
  }),
};

const createLikeFeed = {
  body: Joi.object().keys({
    feed_id: Joi.string().required(),
  }),
};

module.exports = {
  createNewFeed,
  createLikeFeed,
};
