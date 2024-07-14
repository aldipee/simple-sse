const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { buildResponse } = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const createFile = catchAsync(async (req, res) => {
	console.log(req.file)

  const result = await uploadService.createNewFile({ staticPath: req.file.filename });
  const data = {
    fileUrl: `${config.host}/filesdata/${req.file.filename}`,
    id: result.id,
  };
  res.status(httpStatus.CREATED).send(buildResponse({ message: 'Success create quote', data }));
});

const getFile = catchAsync(async (req, res) => {
  const file = await uploadService.getFileById(req.params.id);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(file);
});

module.exports = {
  createFile,
  getFile,
};
