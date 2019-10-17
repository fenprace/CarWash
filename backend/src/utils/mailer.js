const nodemailer = require('nodemailer');
const moment = require('moment');

const { APPOINTMENT_TYPE_LIST, VEHICLE_TYPE_LIST } = require('../utils/misc');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gabrielndavid.live@gmail.com',
    pass: 'gabriel&david',
  },
});

const sendMail = ({ from, to, subject, text }) => {
  const _from = from || 'gabrielndavid.live@gmail.com';

  return new Promise((resolve, reject) => {
    transport.sendMail({ from: _from, to, subject, text }, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
};

const sendGreeting = async ({ to }) => {
  return await sendMail({
    to,
    subject: 'Welcome to Gabriel & David!',
    text: 'You have registered on GabrielnDavid.live successfully! Welcome!',
  });
};

const sendAppointmentConfirmation = async ({ to, appointment, vehicle, contact }) => {
  return await sendMail({
    to,
    subject: 'Appointment Confirmation',
    text: `You have just successfully booked an appointment on GabrielnDavid.live. The followings are details:
  
- Service: ${APPOINTMENT_TYPE_LIST[appointment.appointmentType].primary};
- Price: ${APPOINTMENT_TYPE_LIST[appointment.appointmentType].secondary};
- Vehicle: ${VEHICLE_TYPE_LIST[vehicle.vehicleType - 1]};
- Time: ${moment(appointment.time).format('HH:MM, dddd, MMMM Do, YYYY')};
- Contact:
  - Name: ${contact.name};
  - Tel: ${contact.telephoneNumber};
  - Address: ${contact.street}, ${contact.suburb}, ${contact.state};

Please contact us if you have any questions.
`,
  });
};

const sendCancellationConfirmation = async ({ to, time }) => {
  return await sendMail({
    to,
    subject: 'Concellation Confirmation',
    text: `Your appointment, schduled for ${moment(time).format('HH:MM, dddd, MMMM Do, YYYY')}, has been cancelled successfully.`,
  });
};

const sendAppointmentRescheduling = async ({ to, oTime, nTime }) => {
  return await sendMail({
    to,
    subject: 'Rescheduling Confirmation',
    text: `Your appointment, schduled for ${moment(oTime).format('HH:MM, dddd, MMMM Do, YYYY')}, has been rescheduled for ${moment(nTime).format('HH:MM, dddd, MMMM Do, YYYY')}.`
  });
};

module.exports = {
  sendMail,
  sendGreeting,
  sendAppointmentConfirmation,
  sendCancellationConfirmation,
  sendAppointmentRescheduling,
};