const jwt = require('jsonwebtoken')
const UM = require('../models/user')
const Constants = require('../Message/message')
exports.Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) throw new Error(Constants.AUTH_TOKEN_MISSING)

        const tokenVerify = jwt.verify(token, process.env.Secure_key)

        if (!tokenVerify) throw new Error(Constants.INVALID_TOKEN)

        const userVerify = await UM.findById(tokenVerify.id)
        if (!userVerify) throw new Error(Constants.USER_NOT_FOUND)

        next()

    } catch (error) {
        res.status(404).json({
            status: Constants.FAILURE,
            message: error.message
        })
    }


}