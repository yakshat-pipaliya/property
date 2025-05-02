const UM = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.createAdmin = async (req, res) => {
    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { Email, Phone, Password } = req.body;

        if (!emailRegex.test(Email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const existingUser = await UM.findOne({ Email: req.body.Email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists"
            });
        }
        const phoneRegex = /^\+91\s\d{10}$/
        if (!phoneRegex.test(Phone)) {
            return res.status(400).json({
                status: "fail",
                message: "Number enter to +91 7845987410"
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        if (!passwordRegex.test(Password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 8 characters (example :- Abcd@123)"
            });
        }


        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const createdata = await UM.create({ ...req.body, Password: hashedPassword });
        // console.log(req.body);


        res.status(201).json({
            status: "success",
            message: "admin created successfully!",
            createdata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};
exports.getAdmin = async (req, res) => {
    try {

        const viewdata = await UM.find();
        
        res.status(200).json({
            status: "success",
            message: "Admin found successfully!",
            data: viewdata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        console.log("hello");
        
        let logindata = await UM.findOne({ Email: req.body.Email });

        if (!logindata) {
            return res.status(404).json({
                status: "fail",
                message: "Admin not found"
            });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.Password, logindata.Password);
        
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ id: logindata._id }, 'YP');

        res.status(200).json({
            status: "success",
            message: "Admin Login successfully",
            data: logindata,
            token
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateAdmin = async (req, res) => {
    try {

        const updatedata = await UM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedata) {
            return res.status(404).json({
                status: "fail",
                message: "Admin not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Admin updated successfully!",
            data: updatedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {

        const deletedata = await UM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: "fail",
                message: "Admin not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Admin deleted successfully!",
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};