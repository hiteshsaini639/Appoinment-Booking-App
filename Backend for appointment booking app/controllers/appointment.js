const { JSON } = require("sequelize");
const Appointment = require("../models/appointment");

exports.addAppointment = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  Appointment.create({
    name: name,
    email: email,
  })
    .then((result) => {
      console.log("Appointment added");
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.sendAppointments = (req, res, next) => {
  Appointment.findAll().then((appointments) => {
    res.send(appointments);
  });
};

exports.deleteAppointment = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      console.log("Appointment deleted");
      return appointment.destroy();
    })
    .then(() => {
      res.send();
    })
    .catch((err) => console.log(err));
};

exports.editAppointment = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      appointment.name = updatedName;
      appointment.email = updatedEmail;
      return appointment.save();
    })
    .then(() => {
      res.send();
    })
    .catch((err) => console.log(err));
};
