const mongoose = require('mongoose')

const trainerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    experiance: {
        type: Number,
        required: true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },

    password: {
        type: String,
        required: true
    },

    profile: {
        type: Object
    },

    adminApproved: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('trainers', trainerSchema)
