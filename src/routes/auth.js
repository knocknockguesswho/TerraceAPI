const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const authMiddleware = require('../middleware/auth')
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

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
// router.post('/refresh', authController.refreshToken);
// router.post('/register', upload.none(), authController.register);
// router.post('/login', upload.none(), authController.login);

module.exports = router;