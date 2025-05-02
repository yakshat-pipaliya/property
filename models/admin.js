let mongoose = require('mongoose')
let Schema = mongoose.Schema

let adminSchema = new Schema({
    Email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please Enter Email"]
    },
    Phone: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please Enter Phone number"]
    },
    Password: {
        type: String,
        trim: true,
        required: [true, "Please Enter Password"]
    },
})

module.exports = mongoose.model('admin', adminSchema)
