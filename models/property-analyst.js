const mongoose = require('mongoose');
const Messages = require('../Message/message'); 

const analystSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: [true, Messages.PROPERTY_DATA_REQUIRED]
    },
    description: {
        type: String,
        required: [true, Messages.PROPERTY_ANALYST_DATA_REQUIRED]
    },
    facilities: {
        totalRooms: {
            type: Number,
            required: [true, Messages.ROOMS_REQUIRED]
        },
        kitchen: {
            type: String,
            required: [true, Messages.KITCHEN_REQUIRED]
        },
        tv: {
            type: Boolean,
            default: false
        },
        wifi: {
            type: Boolean,
            default: false
        },
        washrooms: {
            type: Number,
            required: [true, Messages.WASHROOMS_REQUIRED]
        },
        playground: {
            type: Boolean,
            default: false
        },
        gym: {
            type: Boolean,
            default: false
        },
        swimmingPool: {
            type: Boolean,
            default: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Analyst', analystSchema);
