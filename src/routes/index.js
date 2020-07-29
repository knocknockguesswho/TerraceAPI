const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const users = require('./users');


router.use('/user', users);
router.use('/auth', authRouter);


module.exports = router;