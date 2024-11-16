const multer = require('multer');
const jwt = require('jsonwebtoken')
const trainer = require('./trainerSchema')

const secret = 'beni'



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("profile");


// Trainer Registeration
const registerTrainer = async (req, res) => {
    try {
        // Check if email already exists
        const emailExists = await trainer.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(409).json({
                status: 409,
                msg: "Email already exists",
            });
        }

        // Check if mobile number already exists
        const mobileExists = await trainer.findOne({ mobile: req.body.mobile });
        if (mobileExists) {
            return res.status(409).json({
                status: 409,
                msg: "Mobile number already exists",
            });
        }
        const newTrainer = new trainer({
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            course: req.body.course,
            qualification: req.body.qualification,
            experiance: req.body.experiance,
            mobile: req.body.mobile,
            email: req.body.email,
            password: req.body.password,
            profile: req.file
        })

        const data = await newTrainer.save()

        res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
        });
    }

}

// Trainer Login
const trainerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trainers = await trainer.findOne({ email });

        if (!trainers) {
            return res.status(404).json({
                status: 404,
                msg: "Email not found",
            });
        }

        if (!trainers.isActive) {
            return res.status(403).json({
                status: 403,
                msg: "Account is inactive. Please contact admin.",
            });
        }

        if (trainers.password !== password) {
            return res.status(401).json({
                status: 401,
                msg: "Incorrect password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: trainers.email, id: trainers._id },
            secret, // Use secret consistently
            { expiresIn: '1d' } // Use a readable string for expiresIn
        );

        res.json({
            status: 200,
            msg: "Login successful",
            token,
            id: trainers._id,
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


// View All trainers
const ViewAllTrainers = (req, res) => {
    trainer
        .find({ isActive: true })
        .exec()
        .then((data) => {
            if (!data) {
                res.json({
                    status: 404,
                    msg: "Trainer Not found !",
                })
            }
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data,
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "An error occurred",
                Error: err
            })
        })
};

// View All Trainer Request

const ViewAllTrainersReq = (req, res) => {
    trainer
        .find({ isActive: false })
        .exec()
        .then((data) => {
            if (!data) {
                res.json({
                    status: 404,
                    msg: "Trainer Not found !",
                })
            }
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data,
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "An error occurred",
                Error: err
            })
        })
};

// View Trainers By Id
const viewTrainersById = (req, res) => {
    trainer.findOne({ _id: req.params.id }).exec()
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

// Admin Approve Trainer
const ApproveTrainer = (req, res) => {
    trainer
        .findByIdAndUpdate(
            { _id: req.params.id },
            { adminApproved: true, isActive: true }
        )
        .exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: "data obtained",
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "Error in API",
                err: err,
            });
        });
};

//Admin Reject Trainer
const rejectTrainer = async (req, res) => {
    await trainer
        .findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: "data deleted",
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "Error in API",
                err: err,
            });
        });
};

module.exports = {
    upload,
    registerTrainer,
    trainerLogin,
    ViewAllTrainers,
    ViewAllTrainersReq,
    viewTrainersById,
    ApproveTrainer,
    rejectTrainer
}