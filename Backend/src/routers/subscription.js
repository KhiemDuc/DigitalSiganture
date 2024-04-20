const express = require('express');
const authentication = require('../middlewares/authentication');
const asyncHandler = require('../utils/asyncHandler');
const Subscription = require('../controllers/subscription.controller');

const router = express.Router();

router.use(authentication)
router.post('/', asyncHandler(Subscription.postToken))
router.get('/', asyncHandler(Subscription.getInfo))

module.exports = router

