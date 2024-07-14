const { mongoose } = require('../utils/redisClient');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    staticPath: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

/**
 * @typedef Quote
 */
const Quote = mongoose.model('File', fileSchema);

module.exports = Quote;
