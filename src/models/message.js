const connection = require('../helpers/mysql');

module.exports = {
  sendMessageModel: function(sender_id, receiver_id, message){
    return new Promise((resolve, reject)=>{
      connection.query(`INSERT INTO chatroom (sender_id, receiver_id) SELECT ${sender_id}, ${receiver_id} WHERE NOT EXISTS (SELECT * FROM chatroom WHERE sender_id=${sender_id} AND receiver_id=${receiver_id} LIMIT 1); INSERT INTO conversation SET sender_id=${sender_id}, receiver_id=${receiver_id}, chatroom_id=(SELECT id FROM chatroom WHERE sender_id=${sender_id} AND receiver_id=${receiver_id}), message=?`, message, function(error, result){
        if(error){
          reject(error);
        }
        const newData = {
          // id: result.insertId,
          sender_id: sender_id,
          receiver_id: receiver_id,
          message: message,
        }
        resolve(newData)
      })
    })
  },
  showLastMessageModel: function(user_id){
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT m.id as id_chat, m.sender_id, m.receiver_id, m.message, m.chatroom_id, m.created_at, us.id as id_us, us.fullname as sender_fullname, us.avatar as sender_avatar, ur.id as id_ur, ur.fullname as receiver_fullname, ur.avatar as receiver_avatar FROM conversation m INNER JOIN users us ON m.sender_id=us.id INNER JOIN users ur ON m.receiver_id=ur.id WHERE m.id IN (SELECT MAX(id) FROM conversation WHERE receiver_id=? OR sender_id=? GROUP BY chatroom_id) ORDER BY m.created_at DESC`, [user_id, user_id], function(error, result){
        if(error){
          reject(error);
        }
        resolve(result);
      })
    })
  },
  showAllMessagesModel: function(user_id){
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT m.id as id_chat, m.sender_id, m.receiver_id, m.message, m.chatroom_id, m.created_at, us.id as id_us, us.fullname as sender_fullname, us.avatar as sender_avatar, ur.id as id_ur, ur.fullname as receiver_fullname, ur.avatar as receiver_avatar FROM conversation m INNER JOIN users us ON m.sender_id=us.id INNER JOIN users ur ON m.receiver_id=ur.id WHERE m.id IN (SELECT MAX(id) FROM conversation WHERE receiver_id=? OR sender_id=? GROUP BY chatroom_id) ORDER BY m.created_at`, [user_id, user_id], function(error, result){
        if(error){
          reject(error)
        }
        resolve(result)
      })
    })
  }
}