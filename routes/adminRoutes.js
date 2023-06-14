const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminController');
const router = express.Router()

// GET METHOD || users
router.get('/getAllUsers', authMiddleware, getAllUsersController)

// GET METHOD || doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

// POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)


module.exports = router