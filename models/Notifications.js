import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    message: { type: String, required: true },
    bookingId: { type: String, required: true }, // Assuming you want to relate notifications to bookings
    bookingTime: { type: String, required: false }, // Field to store booking time
    createdAt: { type: Date, default: Date.now },
    dismissed: { type: Boolean, default: false }, // Field to track if the notification is dismissed
    status: { 
        type: String, 
        enum: ['accepted', 'rejected', 'pending'], // Allowed values for the status
        default: 'pending' // Set a default value for status
    }
});

// Export the Notification model
export default mongoose.model('Notification', NotificationSchema);