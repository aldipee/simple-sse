const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const feedLikeSchema = mongoose.Schema(
  {
    feed_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Feed',
      required: true,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
feedLikeSchema.plugin(toJSON);
feedLikeSchema.plugin(paginate);

/**
 * @typedef User
 */
const FeedLike = mongoose.model('FeedLike', feedLikeSchema);

module.exports = FeedLike;
