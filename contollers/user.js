const UM = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Constants = require('../Message/message');

exports.createUser = async (req, res) => {
    try {
        const { Email, Phone, Password } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!emailRegex.test(Email)) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.INVALID_EMAIL
            });
        }

        const existingUser = await UM.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.EMAIL_ALREADY_EXISTS
            });
        }

        const phoneRegex = /^\+91\s\d{10}$/;
        if (!phoneRegex.test(Phone)) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.INVALID_PHONE
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        if (!passwordRegex.test(Password)) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.INVALID_PASSWORD
            });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const createdata = await UM.create({ ...req.body, Password: hashedPassword });
        

        res.status(201).json({
            status: Constants.SUCCESS,
            message: Constants.USER_CREATED,
            data: createdata
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const viewdata = await UM.find();
        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.USERS_FOUND,
            data: viewdata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const logindata = await UM.findOne({ Email: req.body.Email });

        if (!logindata) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.USER_NOT_FOUND
            });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.Password, logindata.Password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.INVALID_USER_PASSWORD
            });
        }

        const token = jwt.sign({ id: logindata._id }, process.env.Secure_key);

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.LOGIN_SUCCESS,
            data: logindata,
            token
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedata = await UM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedata) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.USER_NOT_FOUND
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.UPDATE_SUCCESS,
            data: updatedata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedata = await UM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.USER_NOT_FOUND
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.DELETE_SUCCESS,
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};
