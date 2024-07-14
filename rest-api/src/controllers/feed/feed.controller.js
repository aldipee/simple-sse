const httpStatus = require('http-status');

const pick = require('../../utils/pick');

const catchAsync = require('../../utils/catchAsync');
const { feedService, userService } = require('../../services');
const { appEventEmitter } = require('../../utils/AppEventEmitter');

const getMessageByCategory = (category) => {
  switch (category) {
    case 'FEED_LIKE':
      return 'liked your feed';
    case 'FEED_UNLIKE':
      return 'unliked your feed';
    default:
      return '';
  }
};

const generateNotificationForFeed = (feedItem, senderUser, notifCategory) => {
  const notification = {
    sender_id: senderUser.id,
    sender_name: senderUser.name,
    receiver_id: feedItem.user_id.toString(),
    message: `${senderUser.name} ${getMessageByCategory(notifCategory)}`,
  };
  return notification;
};

const createFeed = catchAsync(async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  const user = await feedService.createFeed(body);
  res.status(httpStatus.CREATED).send(user);
});

const getFeeds = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'role']);
  if (filter.title) {
    filter.title = { $regex: filter.title };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await feedService.queryFeed(filter, options, req.user.id);
  res.send(result);
});

const createLikeFeed = catchAsync(async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  const currentUser = await userService.getUserById(req.user.id);

  const feedLikeItem = await feedService.createLikeFeed(body);
  const feedItem = await feedService.getFeedById(feedLikeItem.feed_id);

  const notifMessage = generateNotificationForFeed(feedItem, currentUser, 'FEED_LIKE');
  appEventEmitter.emit('FEED_REACTION', notifMessage);
  res.status(httpStatus.CREATED).send(feedLikeItem);
});

const removeLikeFeed = catchAsync(async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  const currentUser = await userService.getUserById(req.user.id);
  const feedLikeItem = await feedService.removeLikeFeed(body);
  const feedItem = await feedService.getFeedById(feedLikeItem.feed_id);
  appEventEmitter.emit('FEED_REACTION', generateNotificationForFeed(feedItem, currentUser, 'FEED_UNLIKE'));
  res.status(httpStatus.CREATED).send(feedLikeItem);
});

module.exports = {
  getFeeds,
  createFeed,
  createLikeFeed,
  removeLikeFeed,
};
