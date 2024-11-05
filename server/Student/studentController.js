const students = require('./studentSchema')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("profile");

const registerStudent = async (req, res) => {
    try {
        // Check if email already exists
        const emailExists = await students.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(409).json({
                status: 409,
                msg: "Email already exists",
            });
        }

        // Check if mobile number already exists
        const mobileExists = await students.findOne({ mobileNumber: req.body.mobileNumber });
        if (mobileExists) {
            return res.status(409).json({
                status: 409,
                msg: "Mobile number already exists",
            });
        }

        // If both email and mobile number are unique, create the new student
        const newStudent = new students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: req.body.password,
            profile: req.file 
            // ? req.file.path : null,
        });

        const data = await newStudent.save();

        res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
        });
    }
};


module.exports = {
    registerStudent,
    upload
}