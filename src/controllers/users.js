const usersModel = require('../models/users');
const helper = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/global');
const { response } = require('../helpers/index');

module.exports = {
  showAllUsers: async function(req, res){
    try{
      const result = await usersModel.showAllUsersModel();
      return helper.response(res, `success`, result, 200);
    } catch(error){
      console.log(error);
      return helper.response(res, `fail`, `Internal Server Error`, 500);
    }
  },
  addFriend: async function(req, res){
    const id = req.params.id;
    const friendID = req.body.id;
    try{
      const result = await usersModel.addFriendModel(id, friendID);
      return helper.response(res, `success`, `Friend with id: ${friendID} has been added by User with id: ${id}.`, 200);
    } catch(error){
      return helper.response(res, `fail`, `Internal Server Error`, 500);
    }
  },
  showFriends: async function(req, res){
    const id = req.params.id;
    try{
      const result = await usersModel.showFriendsModel(id);
      return helper.response(res, `success`, result, 200);
    } catch(error){
      console.log(error)
      return helper.response(res, `fail`, `Internal Server Error`, 500);
    }
  },
  deleteFriend: async function(req, res){
    const id = req.params.id;
    const friendID = req.body.id;
    try{
      const result = await usersModel.deleteFriendModel(id, friendID);
      return helper.response(res, `success`, `Friend with id: ${friendID} has been deleted by User with id: ${id}.`, 200);
    } catch(error){
      console.log(error);
      return helper.response(res, `fail`, `Internal Server Error`, 500);
    }
  },
  searchUsers: async function(req, res){
    const name = req.params.name;
    try{
      const result = await usersModel.searchUsersModel(name);
      return helper.response(res, `success`, result, 200);
    } catch(error){
      console.log(error);
      return helper.response(res, `fail`, `Internal Server Error`, 500);
    }
  },
  setLocation: async function(req, res){
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const id = req.params.id
    try{
      const result = await usersModel.setLocationModel(lat, lon, id);
      return helper.response(res, `success`, `Current Location has been updated`, 200);
    } catch(err){
      console.log(err);
      return helper.response(res, 'fail', 'Internal Server Error', 500)
    }
  }
}