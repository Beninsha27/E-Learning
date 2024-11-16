// const students = require('./studentSchema')
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, "./upload");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const secret = 'stureg';

// // const createToken = (student) => {
// //   return jwt.sign({ stuId: student._id }, secret, { expiresIn: '1h' });
// // };

// const upload = multer({ storage: storage }).single("profile");

// const registerStudent = async (req, res) => {
//     try {
//         // Check if email already exists
//         const emailExists = await students.findOne({ email: req.body.email });
//         if (emailExists) {
//             return res.status(409).json({
//                 status: 409,
//                 msg: "Email already exists",
//             });
//         }

//         // Check if mobile number already exists
//         const mobileExists = await students.findOne({ mobileNumber: req.body.mobileNumber });
//         if (mobileExists) {
//             return res.status(409).json({
//                 status: 409,
//                 msg: "Mobile number already exists",
//             });
//         }

//         // If both email and mobile number are unique, create the new student
//         const newStudent = new students({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             dateOfBirth: req.body.dateOfBirth,
//             gender: req.body.gender,
//             mobileNumber: req.body.mobileNumber,
//             email: req.body.email,
//             password: req.body.password,
//             profile: req.file 
//             // ? req.file.path : null,
//         });

//         const data = await newStudent.save();

//         res.json({
//             status: 200,
//             msg: "Inserted successfully",
//             data: data,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: 500,
//             msg: "Data not Inserted",
//             Error: err,
//         });
//     }
// };

// // Validation

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];

//     console.log("t1", token);
//     console.log("secret", secret);
//     if (!token) {
//         return res.json({ status: 401, msg: 'Unauthorized' });
//     }
//     jwt.verify(token, secret, (err, decodedToken) => {
//         console.log(decodedToken);
//         if (err) {
//             return res.json({ status: 401, messagge: 'Unauthorized', err: err });
//         }

//         req.user = decodedToken.userId;
//         next();
//         return res.json({ status: 200, msg: 'ok', user: decodedToken.userId });
//     });
//     console.log(req.user);
// };

// const studentLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const student = await students.findOne({ email });

//         if (!student) {
//             return res.status(404).json({
//                 status: 404,
//                 msg: "Email not found",
//             });
//         }

//         if (student.password !== password) {
//             return res.status(401).json({
//                 status: 401,
//                 msg: "Incorrect password",
//             });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { email: student.email, id: student._id },
//             "secret_key",
//             { expiresIn: 86400 }
//         );

//         res.json({
//             status: 200,
//             msg: "Login successful",
//             token,
//             id: student._id,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: 500,
//             msg: "An error occurred",
//             error: err.message,
//         });
//     }
// };




// module.exports = {
//     registerStudent,
//     upload,
//     studentLogin
// }

const students = require('./studentSchema');
const multer = require('multer');
const jwt = require('jsonwebtoken'); // Import jwt for token handling
const path = require('path'); // Import path if necessary for file paths

const secret = 'stureg'; // Use this consistently across token-related functions

// Set up multer storage for profile picture upload
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

module.exports = {
    registerStudent,
    upload,
    studentLogin,
    viewAllStudents,
    viewStudentById
};
