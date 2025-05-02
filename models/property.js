let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Constants = require('../Message/message');

let propertySchema = new Schema({
    Image: {
        type: [String],
        required: [true, Constants.PROPERTY_IMAGE_REQUIRED]
    },
    Name: {
        type: String,
        required: [true, Constants.PROPERTY_Name]
    },
    Location: {
        type: String,
        required: [true, Constants.PROPERTY_LOCATION_REQUIRED]
    },
    Address: {
        type: String,
        trim: true,
        required: [true, Constants.PROPERTY_ADDRESS_REQUIRED]
    },
    Size: {
        type: String,
        required: [true, Constants.PROPERTY_SIZE_REQUIRED]
    }
});

module.exports = mongoose.model('Property', propertySchema);
