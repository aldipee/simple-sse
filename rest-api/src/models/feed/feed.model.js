const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const feedSchema = mongoose.Schema(
  {
    title: {
      type: 'String',
      required: true,
      trim: true,
    },
    author: {
      type: 'String',
      required: true,
      trim: true,
    },
    cover_image: {
      type: 'String',
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
feedSchema.plugin(toJSON);
feedSchema.plugin(paginate);

/**
 * @typedef Feed
 */
const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
