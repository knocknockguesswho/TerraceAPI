const messageModel = require('../models/message');
const helper = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/global');
const { response } = require('../helpers/index');

module.exports = {
  sendMessage: async function(req, res){
    // const setData = req.body;
    const sender_id = req.body.sender_id
    const receiver_id = req.body.receiver_id;
    const message = req.body.message;
    try{
      const result = await messageModel.sendMessageModel(sender_id, receiver_id, message)
      req.io.emit('chat-message', result)
      return helper.response(res, `success`, result, 200);
    } catch(error){
      console.log(error)
      return helper.response(res, `fail`, `Internal Server Error`, 500)
    }
  },
  showLastMessage: async function(req, res){
    const user_id = req.params.id;
    try{
      const result = await messageModel.showLastMessageModel(user_id)
      req.io.emit('last-message', result)
      // console.log(result, 'test')
      return helper.response(res, `success`, result, 200)
    } catch(err){
      console.log(err)
      return helper.response(req, `fail`, `Internal Server Error`, 500)
    }
  },
  showAllMessages: async function(req, res){
    const user_id = req.params.id;
    try{
      const result = await messageModel.showAllMessagesModel(user_id)
      return helper.response(res, `success`, result, 200)
    } catch(err){
      console.log(err)
      return helper.response(req, `fail`, `Internal Server Error`, 500)
    }
  }
}