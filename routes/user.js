var express = require('express');
var router = express.Router();
const UC = require('../contollers/user')
/* GET users listing. */
router.post('/', UC.createUser);
router.post('/login', UC.loginUser);
router.get('/', UC.getUsers);
router.patch('/:id', UC.updateUser);
router.delete('/:id', UC.deleteUser);

module.exports = router;
