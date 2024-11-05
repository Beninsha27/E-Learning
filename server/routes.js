const express = require('express')
const router = express.Router()
const students = require('./Student/studentController')
const trainers = require('./Trainer/trainerController')

// Student
router.post('/Studentreg', students.upload, students.registerStudent)

// Trainer
router.post('/Trainerreg', trainers.upload, trainers.registerTrainer)

module.exports = router