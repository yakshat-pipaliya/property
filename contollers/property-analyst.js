const PM = require('../models/property-analyst');
const Constants = require('../Message/message');

exports.create = async (req, res) => {
    try {
        const createdata = await PM.create(req.body);

        res.status(201).json({
            status: Constants.SUCCESS,
            message: Constants.PROPERTY_ANALYST_CREATED,
            data: createdata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE,
            error: error.message
        });
    }
};

exports.viewall = async (req, res) => {
    try {
        const viewall = await PM.find().populate('PropertyId');

        if (viewall.length === 0) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_ANALYST_NOT_FOUND
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS, 
            message: Constants.PROPERTY_ANALYST_FOUND,
            data: viewall
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE, 
            message: error.message
        });
    }
};

exports.findone = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: Constants.FAILURE, 
                message: Constants.PROPERTY_ANALYST_DATA_REQUIRED 
            });
        }

        let findone = await PM.findById(id).populate('PropertyId');

        if (!findone) {
            return res.status(404).json({
                status: Constants.FAILURE, 
                message: Constants.PROPERTY_ANALYST_NOT_FOUND 
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS, 
            message: Constants.PROPERTY_ANALYST_FOUND, 
            data: findone
        });

    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE, 
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const update = await PM.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!update) {
            return res.status(404).json({
                status: Constants.FAILURE, 
                message: Constants.PROPERTY_ANALYST_NOT_FOUND 
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS, 
            message: Constants.PROPERTY_ANALYST_UPDATED, 
            data: update
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE, 
            message: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedata = await PM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: Constants.FAILURE,
                message: Constants.PROPERTY_ANALYST_NOT_FOUND 
            });
        }

        res.status(200).json({
            status: Constants.SUCCESS, 
            message: Constants.PROPERTY_ANALYST_DELETED, 
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: Constants.FAILURE, 
            message: error.message
        });
    }
};
