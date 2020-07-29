const authModel = require('../models/auth');
const helper = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/global');
// const newToken = require('../middleware/auth');

module.exports = {
    register: async function(req, res){
        const setData = req.body;//get all of input data including password
        setData.avatar = req.file ? req.file.filename : '';
        const salt = bcrypt.genSaltSync(10);//password hash rounds
        const hashPassword = bcrypt.hashSync(setData.password, salt);//encrypting password
        setData.password = hashPassword;
        try{
            const result = await authModel.registerModel(setData);
            delete result.password;//delete password before send it to response
            
            return helper.response(res, `success`, `Thank you ${result.username} for register on our services!`, 200);
        } catch(error){
            console.log(error)
            // if(error.code==='ER_DUP_FIELDNAME'){
            if(error){
                return helper.response(res, `fail`, `Sorry, username already taken.`, 500)
            }
            return helper.response(res, `fail`, `Internal Server Error`, 500)
        }
    },
    login: async function(req, res){
        const loginData = req.body;
        try{
            const result = await authModel.loginModel(loginData.username);
            if(result.length > 0){
                const dbPassword = result[0].password;
                const passwordMatch = bcrypt.compareSync(loginData.password, dbPassword);

                if(passwordMatch){
                    delete result[0].password;
                    const tokenData = {...result[0]};
                    const token = jwt.sign(tokenData, config.jwtSecretKey, {expiresIn: '3h'});
                    result[0].token = token;
                    const refreshToken = jwt.sign(tokenData, config.jwtSecretKeyRefresh);
                    result[0].refreshToken = refreshToken;
                    return helper.response(res, `success`, result, 200);
                }
                return helper.response(res, `fail`, `Username or Password Wrong`, 400);
                
            }
            return helper.response(res, `fail`, `Username or Password Wrong`, 400);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    // },
    // refreshToken: async function(req,res){
    //     const loginData = req.body;
    //     const refreshToken = loginData.refreshToken
    //     try{
    //         if(refreshToken){
    //             delete decoded.iat;
	// 			delete decoded.exp;
    //             const decoded = req.decodedRefreshToken;
    //             const token = jwt.sign(decoded, config.jwtSecretKey, {expiresIn: '60s'});
    //             const newToken = jwt.sign(decoded, config.jwtSecretKeyRefresh, {expiresIn: '2d'})
                
    //             const setData = {
    //                 status: 'Refresh Token Success',
    //                 data: {
    //                     token: token,
    //                     refreshToken: newToken
    //                 }
    //             }
    //             console.log(refreshToken)
    //             return helper.response(res, `success`, setData, 200);
    //         } else {
    //             return helper.response(res, `fail`, `Bad Request!`, 400)
    //         }
    //     } catch(err){
    //         console.log(err);
    //         return helper.response(res, `fail`, `Internal Server Error`, 500);
    //     }
    }
}