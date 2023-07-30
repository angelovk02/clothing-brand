const router = require('express').Router();

const users = require('./users');
const items = require('./items');

const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/items', items);



module.exports = router;
