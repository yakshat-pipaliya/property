const PM = require('../models/property');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Constants = require('../Message/message');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.h2Lodsh0ywYiYsFSDGdAYXA9jAM
});

exports.createData = async (req, res) => {
    try {
        const property = req.body;

        if (!property) {
            return res.status(400).json({ error: Constants.PROPERTY_DATA_REQUIRED });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'properties' });
                fs.unlinkSync(file.path);
                return result.secure_url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            property.Image = imageUrls;
        }

        const createdProperty = await PM.create(property);

        res.status(201).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_CREATED,
            data: createdProperty,
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message,
        });
    }
};

exports.getData = async (req, res) => {
    try {
        const viewdata = await PM.find();

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_FOUND,
            data: viewdata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.findoneData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: "ID is required"
            });
        }
        const findone = await PM.findById(id);
        if (!findone) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_NOT_FOUND
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_FOUND,
            data: findone
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.deleteData = async (req, res) => {
    try {
        const deletedata = await PM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_NOT_FOUND
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_DELETED,
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};

exports.updateData = async (req, res) => {
    try {
        const updatedProperty = req.body;

        if (!updatedProperty) {
            return res.status(400).json({ error: Constants.PROPERTY_DATA_REQUIRED });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'properties' });
                fs.unlinkSync(file.path);
                return result.secure_url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            updatedProperty.Image = imageUrls;
        }

        const property = await PM.findByIdAndUpdate(req.params.id, updatedProperty, { new: true });

        if (!property) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_NOT_FOUND,
            });
        }
        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_UPDATED,
            data: property,
        });

    } catch (error) {
        console.error('Error Updating Property:', error.message);
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message,
        });
    }
};

exports.searchData = async (req, res) => {
    try {
        const { Name } = req.query;

        if (!Name) {
            return res.status(400).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_NAME_REQUIRED
            });
        }

        const query = { Name: { $regex: Name, $options: 'i' } };

        const properties = await PM.find(query);

        if (!properties.length) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_SEARCH_EMPTY
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTIES_FOUND,
            data: properties
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            message: error.message
        });
    }
};
