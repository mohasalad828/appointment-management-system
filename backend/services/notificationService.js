const axios = require('axios');

const SMS_API_USER = 'Bile2024';
const SMS_API_PASS = 'Bile@2024@';
const SMS_API_BASE_URL = 'https://tabaarakict.so/SendSMS.aspx';

const sendSMS = async (phone, message) => {
    const url = `${SMS_API_BASE_URL}?user=${SMS_API_USER}&pass=${SMS_API_PASS}&cont=${encodeURIComponent(message)}&rec=${phone}`;
    try {
        const response = await axios.get(url);
        console.log("SMS sent successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending SMS:", error.message);
        throw error;
    }
};

// Send notification immediately when appointment is created
const sendNewAppointmentNotification = async (user, appointment) => {
    const message = `Hello ${user.fullName}! You are registered and have an appointment on ${appointment.startDate}.`;
    await sendSMS(user.phone, message);
};

// Send a reminder 1 day before the appointment
const sendOneDayReminder = async (user, appointment) => {
    const message = `Reminder: Your appointment is tomorrow at ${appointment.startDate}. Please be on time.`;
    await sendSMS(user.phone, message);
};

// Send notification when appointment time is reached
const sendAppointmentTimeReachedNotification = async (user, appointment) => {
    const message = `Hello ${user.fullName}, your appointment is now. Please be on time.`;
    await sendSMS(user.phone, message);
};

module.exports = {
    sendNewAppointmentNotification,
    sendOneDayReminder,
    sendAppointmentTimeReachedNotification,
};
