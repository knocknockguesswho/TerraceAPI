const connection = require('../helpers/mysql');
const query = require('../helpers/sqlquery');

module.exports = {
  showAllUsersModel: function(){
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT * FROM users`, function(error, result) {
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  },
  addFriendModel: function(id, friendID){
    return new Promise((resolve, reject)=>{
      connection.query(`INSERT INTO contactlist SET user_id = ?, friend_id = ?`, [id, friendID], function(error, result){
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  },
  showFriendsModel: function(id){
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT * FROM users WHERE id IN(SELECT friend_id FROM contactlist WHERE user_id=?)`, id, function(error, result){
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  },
  deleteFriendModel: function(id, friendID){
    parseInt(id);
    parseInt(friendID);
    return new Promise((resolve, reject)=>{
      connection.query(`DELETE FROM contactlist WHERE user_id=? AND friend_id=?`, [id, friendID], function(error, result){
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  },
  searchUsersModel: function(name){
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT * FROM users WHERE username OR fullname LIKE '%${name}%'`, function(error, result){
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  },
  setLocationModel: function(lat, lon, id){
    return new Promise((resolve, reject)=>{
      connection.query(`UPDATE users SET latitude = ?, longitude = ? WHERE users.id = ?`,[lat, lon, id], function(error, result){
        if(error){
          reject(error)
        }
        console.log(result)
        resolve(result)
      })
    })
  }
}