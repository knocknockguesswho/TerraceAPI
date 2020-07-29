const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const splitName = file.originalname.split('.');
        const ext = splitName.pop();
        const newName = splitName.join('-');
        cb(null, `${newName}-${Date.now()}.${ext}`);
    }
});
const upload = multer({
    storage: storage
});

router.get('/showAllUsers', userController.showAllUsers);
router.get('/showFriends/:id', userController.showFriends);
router.post('/addFriend/:id', userController.addFriend);
router.delete('/deleteFriend/:id', userController.deleteFriend);

//1. post Contact (add user to contactlist) ###DONE
//2. delete Contact 
//3. get Friends (show added user) ###DONE
//4. post conversations
//5. get conversations

module.exports = router;