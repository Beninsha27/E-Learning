const express = require('express')
const router = express.Router()
const students = require('./Student/studentController')
const trainers = require('./Trainer/trainerController')
const course = require('./Course/courseController')

// Student
router.post('/Studentreg', students.upload, students.registerStudent)
router.post('/Studentlogin', students.studentLogin)
router.post('/ViewAllStudent', students.viewAllStudents)
router.post('/ViewStudentById/:id', students.viewStudentById)
router.put('/editStudentById/:id', students.editStudentById) //not worked


// Trainer
router.post('/Trainerreg', trainers.upload, trainers.registerTrainer)
router.post('/Trainerlogin', trainers.trainerLogin)
router.post('/ViewAllTrainers', trainers.ViewAllTrainers)
router.post('/ViewAllTrainersReq', trainers.ViewAllTrainersReq)
router.post('/ViewTrainerById/:id', trainers.viewTrainersById)
router.post('/ApproveTrainerById/:id', trainers.ApproveTrainer)
router.post('/RejectTrainerById/:id', trainers.rejectTrainer)

// Course
router.post('/addCourseById/:id', course.upload, course.addCourseById)
router.post('/viewCourse', course.viewCourse)
router.post('/viewCourseReq', course.viewCourseReq)
router.post('/approveCourseById/:id', course.approveCourseById)
router.post('/removeCourseById/:id', course.removeCourseById)


module.exports = router