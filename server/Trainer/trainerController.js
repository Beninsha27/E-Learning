const multer = require('multer');
const trainer = require('./trainerSchema')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("profile");

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

module.exports = {
    upload,
    registerTrainer
}