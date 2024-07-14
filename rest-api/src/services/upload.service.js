/* eslint-disable no-console */
const { Upload } = require('../models');

/**
 * Create a new quote
 * @param {Object} quoteBody
 * @returns {Promise<Quote>}
 */
const createNewFile = async (quoteBody) => {
  const quote = await Upload.create(quoteBody);
  return quote;
};

/**
 * Get quote by Id
 * @param {ObjectId} id
 * @returns {Promise<Quote>}
 */
const getFileById = async (id) => {
  return Upload.findById(id);
};

module.exports = {
  createNewFile,
  getFileById,
};
