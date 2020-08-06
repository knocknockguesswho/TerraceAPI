const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message')

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

router.post('/send', messageController.sendMessage);
router.get('/showLast/:id', messageController.showLastMessage);
router.get('/showAll/:id', messageController.showAllMessages);


module.exports = router;