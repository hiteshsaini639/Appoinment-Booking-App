const express = require("express");

const appointmentController = require("../controllers/appointment");

const router = express.Router();

router.post("/add-appointment", appointmentController.addAppointment);

router.delete(
  "/delete-appointment/:appointmentId",
  appointmentController.deleteAppointment
);

router.put(
  "/edit-appointment/:appointmentId",
  appointmentController.editAppointment
);

router.get("/load-data", appointmentController.sendAppointments);

module.exports = router;
