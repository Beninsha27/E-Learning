const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    trainerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trainers",
        required: true
    },

    date: {
        type: Date,
    },

    category: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    review: {
        type: Array,
    },

    isactive: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        default: 0,
    },

    cost: {
        type: Number,
        default: 0,
    },

    coverImage: {
        type: Object
    }
});

module.exports = mongoose.model('course', courseSchema)