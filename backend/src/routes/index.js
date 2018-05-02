const router = require('express').Router();
const auth = require('./auth');
const holiday = require('./holiday');

router.use('/user', auth);
router.use('/holiday', holiday);

module.exports = router;