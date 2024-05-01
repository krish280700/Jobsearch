var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// GET users listing(done)
router.get('/', userController.users_list);

// GET users Login
router.post('/login', userController.user_login);

// POST users delete(done) 
router.post('/:id/delete', userController.users_delete_post);

// GET users view(done)
router.get('/:id', userController.user_detail);

// Post users view(done)
router.post('/mail', userController.user_detail_mail);

// GET users edit(done)
router.get('/:id/edit', userController.user_edit_get);

// POST users add(done) 
router.post('/', userController.users_create_post);

// POST users edit
router.post('/:id/edit', userController.users_edit_post);

module.exports = router;
