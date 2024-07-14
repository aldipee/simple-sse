// const httpStatus = require('http-status');
// const { Book, FavoriteBook } = require('../../models');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Feed, FeedLike } = require('../../models');
const logger = require('../../config/logger');

// const ApiError = require('../../utils/ApiError');

const createFeed = async (FeedData) => {
  const result = await axios.get('https://random.imagecdn.app/v1/image?width=500&height=250&format=json');
  const body = {
    ...FeedData,
    cover_image: result.data.url,
    id: uuidv4(),
  };
  return Feed.create(body);
};

const createLikeFeed = async (FeedLikeData) => {
  return FeedLike.create(FeedLikeData);
};

const removeLikeFeed = async (FeedLikeData) => {
  const currentLiked = await FeedLike.findOne({ feed_id: FeedLikeData.feed_id, user_id: FeedLikeData.user_id });
  if (!currentLiked) {
    return null;
  }
  await currentLiked.remove();
  return currentLiked;
};

const getUserLikes = async (userId) => {
  return FeedLike.find({ user_id: userId });
};

const getFeedById = async (feedId) => {
  return Feed.findById(feedId);
};

const queryFeed = async (filter, options, userId) => {
  const userLike = await getUserLikes(userId);

  const userLikeFeedIds = userLike.map((like) => like.feed_id.toString());
  const userLikeFeedIdsSet = new Set(userLikeFeedIds);

  const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc' } = options;

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  try {
    const feeds = await Feed.find(filter).populate('user_id', 'name').sort(sort).skip(skip).limit(limit).exec();
    const totalResults = await Feed.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / limit);

    const results = feeds.map((feed) => {
      const isLiked = userLikeFeedIdsSet.has(feed._id.toString());
      return {
        ...feed.toJSON(),
        is_liked: isLiked,
      };
    });

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
  } catch (error) {
    logger.error('Error retrieving feeds with user names:', error);
    throw error;
  }
};

module.exports = {
  createFeed,
  getFeedById,
  queryFeed,
  createLikeFeed,
  removeLikeFeed,
};
