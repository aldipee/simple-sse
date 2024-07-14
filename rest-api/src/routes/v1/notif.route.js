const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const notifController = require('../../controllers/notification.controller');

const router = express.Router();

router.route('/stream').get(notifController.latestNotifStream);

module.exports = router;
