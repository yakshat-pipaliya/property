var express = require('express');
var router = express.Router();
const PC = require('../contollers/property-analyst')
const middleware = require('../middleware/jwt')
/* GET users listing. */
router.post('/', middleware.Auth,PC.create);
router.get('/',PC.viewall)
router.get('/:id',PC.findone)
router.patch('/:id',middleware.Auth,PC.update)
router.delete('/:id',middleware.Auth,PC.delete)

module.exports = router;
