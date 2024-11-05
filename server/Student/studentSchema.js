const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: Number,
        required: true,
        unique:true,
        dropDups: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },

    password: {
        type: String,
        required: true
    },
    profile: {
        type: Object
    }
});

module.exports = mongoose.model('students', studentSchema)