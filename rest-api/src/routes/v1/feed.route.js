const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const feedValidation = require('../../validations/feed.validation');
const feedController = require('../../controllers/feed/feed.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('feed'), validate(feedValidation.createNewFeed), feedController.createFeed)
  .get(auth('feed'), feedController.getFeeds);

router.route('/like').post(auth('feed'), validate(feedValidation.createLikeFeed), feedController.createLikeFeed);
router.route('/unlike').post(auth('feed'), validate(feedValidation.createLikeFeed), feedController.removeLikeFeed);

module.exports = router;
