const students = require('./studentSchema');
const multer = require('multer');
const jwt = require('jsonwebtoken'); // Import jwt for token handling
const path = require('path'); // Import path if necessary for file paths

const secret = 'stureg'; // Use this consistently across token-related functions

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Corrected 'res' to 'file'
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("profile");

// Student registration function
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

        // Create new student if email and mobile number are unique
        const newStudent = new students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: req.body.password,
            profile: req.file
            // ? req.file.path : null 
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
            msg: "Data not inserted",
            error: err.message,
        });
    }
};

// Token verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, msg: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ status: 401, msg: 'Unauthorized', error: err.message });
        }

        req.user = decodedToken.id;
        next();
    });
};

// Student login function
const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await students.findOne({ email });

        if (!student) {
            return res.status(404).json({
                status: 404,
                msg: "Email not found",
            });
        }

        if (student.password !== password) {
            return res.status(401).json({
                status: 401,
                msg: "Incorrect password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: student.email, id: student._id },
            secret, // Use secret consistently
            { expiresIn: '1d' } // Use a readable string for expiresIn
        );

        res.json({
            status: 200,
            msg: "Login successful",
            token,
            id: student._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            msg: "An error occurred",
            error: err.message,
        });
    }
};

// View All Students
const viewAllStudents = (req, res) => {
    students
        .find()
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "An error occurred",
                Error: err
            })
        })
}

// View Students By Id
const viewStudentById = (req, res) => {
    students.findOne({ _id: req.params.id }).exec()
        .then(data => {

            console.log(data);
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })
}

// Edit Student By Id
const editStudentById = (req, res) => {
    students.findByIdAndUpdate({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: req.body.password,
        profile: req.file
    })
        .exec()
        .then((response) => {
            res.json({
                status: 200,
                msg: "updated successfully",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "error", err
            })
            console.log(err);
        })

}




module.exports = {
    registerStudent,
    upload,
    studentLogin,
    viewAllStudents,
    viewStudentById,
    editStudentById
};
