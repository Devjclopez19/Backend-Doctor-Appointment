const appointmentMdodel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Doctor Details",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
    res.status(201).send({
      success: true,
      message: 'Doctor Profile Updated',
      data: doctor
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor profile update issue",
      error,
    });
  }
}

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById({_id: req.body.doctorId})
    res.status(200).send({
      success: true,
      message: 'Single Doctor Info Fetched',
      data: doctor
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single doctor info",
      error,
    });
  }
}

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({userId: req.body.userId})
    const appointments = await appointmentMdodel.find({doctorId:doctor?._id})
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single doctor info",
      error,
    });
  }
}

const updateStatusController = async (req, res) => {
  try {
    const {appointmentsId, status} = req.body
    const appointment = await appointmentMdodel.findByIdAndUpdate(appointmentsId, {status})
    const user = await userModel.findOne({_id: appointment?.userId})
    user?.notification.push({
      type: 'status-updated',
      message: `Your appointment has been updated`,
      onClickPath: '/doctor-appointments'
    })
    await user?.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update status",
      error,
    });
  }
}
module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController };
