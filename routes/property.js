const express = require('express');
const router = express.Router();
const PC = require('../contollers/property');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const middleware = require('../middleware/jwt')
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', middleware.Auth,upload.array('Image', 10), PC.createData);
router.get('/serach',PC.searchData)
router.get('/',PC.getData)
router.get('/:id',PC.findoneData)
router.delete('/:id', middleware.Auth,PC.deleteData)
router.patch('/:id', middleware.Auth,upload.array('Image', 10), PC.updateData);

module.exports = router;
