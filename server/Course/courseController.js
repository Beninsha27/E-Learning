const course = require('./courseSchema')
const trainer = require('../Trainer/trainerSchema')
const multer = require('multer');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("coverImage");

const addCourseById = (req, res) => {
    let date = new Date();

    // Check if the trainer exists based on the provided trainer ID
    const trainerExists = trainer.findById(req.params.id);

    if (!trainerExists) {
        return res.status(404).json({
            status: 404,
            msg: "Trainer not found",
        });
    }

    // Create a new course object based on the schema
    const newCourse = new course({
        title: req.body.title,
        trainerid: req.params.id,
        date: date,
        category: req.body.category,
        description: req.body.description,
        cost: req.body.cost,
        coverImage: req.file
    });

    // Save the new course to the database
    newCourse
        .save()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Course added successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                msg: "Error adding course",
                error: err.message,
            });
        });
};

// View All Course
const viewCourse = (req, res) => {
    course
        .find({ isactive: true })
        .populate('trainerid')
        .exec()
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data,
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained ",
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err,
            });
        });
};

//Admin View all course requests
const viewCourseReq = (req, res) => {
    course
        .find({ isactive: false })
        .populate('trainerid')
        .exec()
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data,
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained ",
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err,
            });
        });
};

//Course remove by admin
const removeCourseById = (req, res) => {
    course
        .findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then((data) => {
            console.log(data);
            res.json({
                status: 200,
                msg: "Data removed  successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err,
            });
        });
};


//Course Approval by admin
const approveCourseById = (req, res) => {
    course
        .findByIdAndUpdate(
            { _id: req.params.id },
            {
                isactive: true,
            }
        )
        .exec()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Updated successfully",
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "Data not Updated",
                Error: err,
            });
        });
};



module.exports = {
    addCourseById,
    upload,
    viewCourse,
    viewCourseReq,
    approveCourseById,
    removeCourseById
}