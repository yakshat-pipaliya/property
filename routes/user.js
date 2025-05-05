var express = require('express');
var router = express.Router();
const UC = require('../contollers/user');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user by providing user details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: "YaaaaP@gmail.com"
 *               Phone:
 *                 type: string
 *                 example: "+91 6414893210"
 *               Password:
 *                 type: string
 *                 example: "Abcd@123"
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: This endpoint returns a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   Email:
 *                     type: string
 *                     example: "YaaaaP@gmail.com"
 *                   Phone:
 *                     type: string
 *                     example: "+91 6414893210"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       500:
 *         description: Internal server error
 */
router.post('/', UC.createUser);

router.post('/login', UC.loginUser);
router.get('/', UC.getUsers);
router.patch('/:id', UC.updateUser);
router.delete('/:id', UC.deleteUser);

module.exports = router;
