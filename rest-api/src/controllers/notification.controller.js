const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { appEventEmitter } = require('../utils/AppEventEmitter');
const pick = require('../utils/pick');
const { tokenService } = require('../services');

const ACTIVE_STREAMING_CONNECTIONS = new Map();

const latestNotifStream = catchAsync(async (req, res) => {
  logger.info(`Total Active Connections: ${ACTIVE_STREAMING_CONNECTIONS.size}`);
  logger.info(`Number of listeners: ${appEventEmitter.listenerCount('FEED_REACTION')}`);
  const options = pick(req.query, ['accessToken']);
  const { accessToken } = options;

  if (!accessToken) return res.status(401).send({ message: 'Unauthorized' });

  const currentUser = await tokenService.getUserByToken(accessToken);

  logger.info('Streaming Connection Open');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.flushHeaders();

  ACTIVE_STREAMING_CONNECTIONS.set(currentUser.id, res);

  let id = 1;

  const sendEvent = (data) => {
    const connection = ACTIVE_STREAMING_CONNECTIONS.get(data.receiver_id);
    if (connection) {
      connection.write(`id: ${id}\n`);
      connection.write(`data: ${JSON.stringify(data)}\n\n`);
      connection.flush();
      // eslint-disable-next-line no-plusplus
      id++;
    }
  };

  const onNewFeed = (feed) => {
    if (feed.receiver_id === currentUser.id) {
      logger.info('Receive new Feed Data');
      sendEvent(feed);
    }
  };

  // Remove any existing listener for this user before adding a new one
  appEventEmitter.removeListener('FEED_REACTION', onNewFeed);
  appEventEmitter.on('FEED_REACTION', onNewFeed);

  req.on('close', () => {
    logger.info('Streaming Connection Close');
    appEventEmitter.removeListener('FEED_REACTION', onNewFeed);
    ACTIVE_STREAMING_CONNECTIONS.delete(currentUser.id);
    res.end();
  });
});

module.exports = {
  latestNotifStream,
};
