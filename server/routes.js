const express = require('express')
const router = express.Router()
const students = require('./Student/studentController')
const trainers = require('./Trainer/trainerController')

// Student
router.post('/Studentreg', students.upload, students.registerStudent)
router.post('/Studentlogin', students.studentLogin)
router.post('/ViewAllStudent', students.viewAllStudents)
router.post('/ViewStudentById/:id', students.viewStudentById)


// Trainer
router.post('/Trainerreg', trainers.upload, trainers.registerTrainer)
router.post('/Trainerlogin', trainers.trainerLogin)
router.post('/ViewAllTrainers', trainers.ViewAllTrainers)
router.post('/ViewAllTrainersReq', trainers.ViewAllTrainersReq)
router.post('/ViewTrainerById/:id', trainers.viewTrainersById)
router.post('/ApproveTrainerById/:id', trainers.ApproveTrainer)
router.post('/RejectTrainerById/:id', trainers.rejectTrainer)

module.exports = router