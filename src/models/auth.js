const connection = require('../helpers/mysql');
const query = require('../helpers/sqlquery');

module.exports = {
    registerModel: function(setData){
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO users (fullname, username, email, password, avatar) SELECT * FROM (SELECT \'${setData.fullname}\', \'${setData.username}\', \'${setData.email}\', \'${setData.password}\', \'${setData.avatar}\') AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = ${setData.username}) LIMIT 1;`, function(error, result){
                if(error){
                    reject(error);
                };
                const newData = {
                    ...setData
                }
                resolve(newData);
            });
        });
    },
    loginModel: function(username){
        return new Promise((resolve, reject)=>{
            connection.query(query.getUserDataByUsername, username, function(error, result){
                if(error){
                    reject(error);
                };
                resolve(result);
            });
        });
    }
};