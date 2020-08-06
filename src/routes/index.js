const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const messageRouter = require('./message');


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/message', messageRouter);


module.exports = router;