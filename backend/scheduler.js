const cron = require('node-cron');
const Appointment = require("./models/appointmentModel");
const UserModel = require("./models/UserModel");
const notificationService = require("./services/notificationService");
const moment = require('moment');

// Scheduler to send a reminder 1 day before the appointment
cron.schedule('0 9 * * *', async () => { // Runs daily at 9 AM
    try {
        const tomorrow = moment().add(1, 'days').startOf('day');
        console.log("Checking appointments for 1-day reminder at:", tomorrow.format());

        const appointments = await Appointment.find({
            startDate: { $gte: tomorrow.toDate(), $lt: tomorrow.endOf('day').toDate() },
            oneDayReminderSent: false,
            status: "Pending"
        });

        for (let appointment of appointments) {
            const user = await UserModel.findById(appointment.userId);
            if (user) {
                await notificationService.sendOneDayReminder(user, appointment);
                appointment.oneDayReminderSent = true; // Mark as sent
                await appointment.save();
                console.log(`One-day reminder sent to ${user.fullName} for appointment ${appointment._id}`);
            }
        }
    } catch (error) {
        console.error("Error sending one-day reminders:", error.message);
    }
});

// Scheduler to send notification when appointment time is reached
cron.schedule('* * * * *', async () => { // Runs every minute
    try {
        const now = moment().startOf('minute');  // Current time, rounded to the nearest minute
        console.log("Checking appointments for exact time reminder at:", now.format());

        const appointments = await Appointment.find({
            startDate: now.toDate(), // Matches the exact minute of the appointment
            timeReachedReminderSent: false,
            status: "Pending"
        });

        if (appointments.length === 0) {
            console.log("No appointments found for exact time reminder.");
        } else {
            console.log(`Found ${appointments.length} appointments for exact time reminder.`);
        }

        for (let appointment of appointments) {
            const user = await UserModel.findById(appointment.userId);
            if (user) {
                console.log(`Sending time-reached reminder for appointment ${appointment._id} to user ${user.fullName}`);

                try {
                    await notificationService.sendAppointmentTimeReachedNotification(user, appointment);
                    console.log("Time-reached notification sent successfully for appointment:", appointment._id);

                    // Mark the time-reached reminder as sent
                    appointment.timeReachedReminderSent = true;
                    await appointment.save();
                } catch (smsError) {
                    console.error("Error sending time-reached reminder SMS:", smsError.message);
                }
            } else {
                console.error("User not found for appointment:", appointment._id);
            }
        }
    } catch (error) {
        console.error("Error checking appointments for exact time reminder:", error.message);
    }
});
