const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require("../controllers/doctorController");

const router = express.Router();

// GET SINGLE DOCTOR
router.get("/getDoctorInfo/:userId", authMiddleware, getDoctorInfoController);

// UPDATE PROFILE
router.put("/updateProfile", authMiddleware, updateProfileController);

// GET SINGLE DOC INFO
router.get("/getDoctorById/:id", authMiddleware, getDoctorByIdController);

// GET APPOINTMENTS
router.get("/doctor-appointments/:userId", authMiddleware, doctorAppointmentsController);

// POST UPDATE STATUS
router.put("/update-status", authMiddleware, updateStatusController);

module.exports = router;
