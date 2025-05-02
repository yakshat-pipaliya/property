var express = require('express');
var router = express.Router();
const AC = require('../contollers/admin')
/* GET users listing. */
router.post('/', AC.createAdmin);
router.post('/login', AC.loginAdmin);
router.get('/', AC.getAdmin);
router.patch('/:id', AC.updateAdmin);
router.delete('/:id', AC.deleteAdmin);

module.exports = router;
