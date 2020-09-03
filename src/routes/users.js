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
router.get('/searchUser/:name', userController.searchUsers)
router.post('/addFriend/:id', userController.addFriend);
router.put('/setLocation/:id', userController.setLocation);
router.delete('/deleteFriend/:id', userController.deleteFriend);

//1. post Contact (add user to contactlist) ###DONE
//2. delete Contact ###DONE
//3. get Friends (show added user) ###DONE
//4. post Conversations
//5. get Conversations
//6. edit Profile (update users)

module.exports = router;