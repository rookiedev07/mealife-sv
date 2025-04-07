import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import Notification from './models/Notifications.js'; // Assuming you have a Notification model

// Load environment variables
dotenv.config({ path: './keys.env' });

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const notifications = [
  {
      _id: "1",
      message: "Your request has been accepted.",
      status: "accepted",
      timestamp: new Date().toISOString()
  },
  {
      _id: "2",
      message: "Your request has been rejected.",
      status: "rejected",
      timestamp: new Date().toISOString()
  },
  {
      _id: "3",
      message: "Your request is pending approval.",
      status: "pending",
      timestamp: new Date().toISOString()
  }
];


// Set file size limit to 10MB
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  profileImage: { type: String },
  address: { type: String },
  phone: { type: String },
  restaurant: {
    type: new mongoose.Schema({
      ownerName: { type: String, default: '' },
      restaurantName: { type: String, default: '' },
      description: { type: String, default: '' },
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
      cuisine: { type: String, default: '' },
      diningStyle: { type: String, default: '' },
      dressCode: { type: String, default: '' },
      parkingDetails: { type: String, default: '' },
      images: [{ type: String }],
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
      bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
    }, { _id: false }),
    default: {}
  }
});

// Create User model
const User = mongoose.model('Users', userSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Review Schema
const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  author: { type: String, required: true }, // This can be the user ID or name
  createdAt: { type: Date, default: Date.now },
});

// Booking Schema
// Booking Schema
const bookingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  userName: { type: String, required: true }, // Ensure this field exists
  date: { type: String, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' } // Ensure this field exists
});
// Create models
const Review = mongoose.model('Review', reviewSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// POST route for creating a review
app.post('/api/reviews', verifyToken, async (req, res) => {
  console.log(req.body); // Log the incoming request body
  const { restaurantId, content, rating } = req.body;

  // Validate input
  if (!restaurantId || !content || !rating) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { 'restaurant._id': restaurantId },
      {
        $push: {
          'restaurant.reviews': {
            content,
            rating,
            author: req.userId,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const newReview = updatedUser.restaurant.reviews[updatedUser.restaurant.reviews.length - 1];
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
});



app.post('/api/bookings', async (req, res) => {
  try {
      const { userId, bookingId, userName, restaurantId, date, time, people } = req.body;

      if (!userId || !bookingId || !userName || !restaurantId || !date || !time || !people) {
          return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const newBooking = new Booking({
          userId,
          bookingId,
          userName,
          restaurantId,
          date,
          time,
          people
      });

      await newBooking.save();

      res.status(200).json({
          success: true,
          message: 'Booking created successfully',
          booking: newBooking // Ensure the booking object is returned
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// Add this route in your main server file

// POST route for creating a notification
// POST route for creating a notification
app.post('/api/notifications', verifyToken, async (req, res) => {
  const { bookingId, userId, message } = req.body;

  if (!bookingId || !userId || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
      const notification = new Notification({
          bookingId,
          userId,
          message,
      });

      await notification.save();
      res.json({ success: true, notification });
  } catch (err) {
      console.error('Error creating notification:', err);
      res.status(500).json({ success: false, message: 'Failed to create notification' });
  }
});


// POST route for accepting a booking
// POST route for accepting a booking
// Accept booking route
app.post('/api/bookings/:action/:id', async (req, res) => {
  const { id, action } = req.params;

  if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action specified' });
  }

  try {
      // Find the booking by ID
      const booking = await Booking.findById(id);

      if (!booking) {
          return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      // Update the booking status
      booking.status = action === 'accept' ? 'accepted' : 'rejected';
      await booking.save();

      // Create a notification for both accepted and rejected bookings
      const notification = new Notification({
        userId: booking.userId,   // Ensure `booking.userId` exists
        bookingId: booking._id,    // Reference the booking ID
        message: `Your booking request has been ${action}ed for ${booking.time}.`, // Include booking time in the message
        status: booking.status,     // Store booking status in the notification
        bookingTime: booking.time   // Include booking time if available
    });

      await notification.save();

      return res.status(200).json({ success: true, message: `Booking ${action}ed successfully.` });
  } catch (err) {
      console.error('Error processing booking action:', err);
      return res.status(500).json({ success: false, message: 'Error processing booking action.' });
  }
});






// Signup Route
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, message: 'User  signed up successfully', token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Error during signup', error: err.message });
  }
});

// Signin Route
// Signin Route
// Signin Route
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({
          success: true,
          message: 'Login successful',
          token,
          role: user.role,
          userId: user._id, // Include userId in the response
          userName: user.name, // Include userName in the response
      });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Error during sign in', error: err.message });
  }
});

// Role Selection Route
app.post('/api/auth/select-role', verifyToken, async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ success: false, message: 'Email and role are required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, { role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User  not found' });
    }

    res.status(200).json({ success: true, message: 'Role updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error during role update:', err);
    res.status(500).json({ success: false, message: 'Error during role update', error: err.message });
  }
});

// Save Restaurant Profile Route
app.post('/api/restaurants', verifyToken, async (req, res) => {
  const {
    ownerName,
    restaurantName,
    description,
    address,
    phone,
    cuisine,
    diningStyle,
    dressCode,
    parkingDetails,
    images,
  } = req.body;

  if (!ownerName || !restaurantName || !address || !phone) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          'restaurant.ownerName': ownerName,
          'restaurant.restaurantName': restaurantName,
          'restaurant.description': description,
          'restaurant.address': address,
          'restaurant.phone': phone,
          'restaurant.cuisine': cuisine,
          'restaurant.diningStyle': diningStyle,
          'restaurant.dressCode': dressCode,
          'restaurant.parkingDetails': parkingDetails,
          'restaurant.images': images,
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User  not found' });
    }

    res.status(200).json({ success: true, message: 'Restaurant profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating restaurant profile:', err);
    res.status(500).json({ success: false, message: 'Error occurred while saving the profile', error: err.message });
  }
});

// Image Upload Route
app.post('/api/upload', upload.array('images', 5), (req, res) => {
  try {
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ success: true, filePaths });
  } catch (err) {
    console.error('Error uploading images:', err);
    res.status(500).json({ success: false, message: 'Error uploading images', error: err.message });
  }
});

// DELETE route for dismissing a notification



// Update User Profile Route (with image upload)
app.put('/api/user/profile', verifyToken, upload.single('profileImage'), async (req, res) => {
  const { name, address, email, phone } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!name && !address && !email && !phone && !profileImage) {
    return res.status(400).json({ success: false, message: 'No fields to update' });
  }

  try {
    const updateData = { name, address, email, phone };
    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User  not found' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error occurred', error: err.message });
    }
    res.status(500).json({ success: false, message: 'Error updating profile', error: err.message });
  }
});

// GET route for fetching notifications for a restaurant
// GET route for fetching bookings for a restaurant
// GET route for fetching bookings for a restaurant
app.get('/api/bookings/restaurants', verifyToken, async (req, res) => {
  const { restaurants } = req.params;

  try {
      const bookings = await Booking.find({ restaurants }).populate('userId', 'name').sort({ createdAt: -1 });

      res.status(200).json({ success: true, bookings });
  } catch (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});


app.get('/api/notify', async (req, res) => {
  try {
      const token = req.headers.authorization.split(" ")[1]; 
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      // Fetch only non-dismissed notifications with status 'accepted' or 'rejected', limit to the 10 most recent
      const notifications = await Notification.find({ 
          userId: decoded.id, 
          dismissed: false, // Only fetch notifications that are not dismissed
          status: { $in: ['accepted', 'rejected'] } // Only fetch notifications with status 'accepted' or 'rejected'
      })
      .sort({ createdAt: -1 }) // Sort by creation date, most recent first
      .limit(10); // Limit to the 10 most recent notifications

      return res.status(200).json({ success: true, notifications });
  } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ success: false, message: 'Error fetching notifications' });
  }
});

app.get('/api/notifications', verifyToken, async (req, res) => {
  try {
      const notifications = await Notification.find({ userId: req.userId }); // Adjust the query as needed
      res.status(200).json({ success: true, notifications });
  } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});

// Fetch User Profile Route
app.get('/api/user/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email profileImage address phone restaurant');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User  not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ success: false, message: 'Error fetching profile', error: err.message });
  }
});

// Fetch Restaurant Profile Route
app.get('/api/restaurant/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('restaurant');
    if (!user || !user.restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }
    res.status(200).json({ success: true, restaurant: user.restaurant });
  } catch (err) {
    console.error('Error fetching restaurant profile:', err);
    res.status(500).json({ success: false, message: 'Error fetching restaurant profile', error: err.message });
  }
});

// Backend Search Route
app.get('/api/restaurant/search', verifyToken, async (req, res) => {
  try {
    const { query } = req.query; // Get the search keyword from query params
    const restaurants = await User.find({
      'restaurant.restaurantName': { $regex: query, $options: 'i' }
    }).select('restaurant.restaurantName restaurant.description restaurant.address restaurant.phone');

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ success: false, message: 'No restaurants found' });
    }

    res.status(200).json({ success: true, restaurants });
  } catch (err) {
    console.error('Error searching for restaurants:', err);
    res.status(500).json({ success: false, message: 'Error searching for restaurants', error: err.message });
  }
});

// Get restaurant details by owner ID
// Get restaurant details by owner ID
app.get("/api/restaurant/owner", verifyToken, async (req, res) => {
  const userId = req.userId; // Use the userId from the token

  try {
      const user = await User.findById(userId).lean(); // Use lean() for better performance
      if (!user || !user.restaurant) {
          return res.status(404).json({ success: false, message: "Restaurant not found" });
      }

      const restaurant = user.restaurant;
      const restaurantDetails = {
          _id: restaurant._id, // Ensure the restaurant ID is included
          ownerName: restaurant.ownerName || "N/A",
          restaurantName: restaurant.restaurantName || "N/A",
          description: restaurant.description || "No description available",
          address: restaurant.address || "No address provided",
          phone: restaurant.phone || "No phone number provided",
          cuisine: restaurant.cuisine || "Cuisine not specified",
          diningStyle: restaurant.diningStyle || "Dining style not specified",
          dressCode: restaurant.dressCode || "Dress code not specified",
          parkingDetails: restaurant.parkingDetails || "Parking details not specified",
          images: restaurant.images || [],
          profilePicture: restaurant.profilePicture || ""
      };

      res.status(200).json({ success: true, restaurant: restaurantDetails });
  } catch (err) {
      console.error("Error fetching restaurant:", err);
      res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

// DELETE route for dismissing a notification
// DELETE route for dismissing a notification
app.delete('/api/notificationbell/:notificationId', verifyToken, async (req, res) => {
  const { notificationId } = req.params;

  try {
      // Find the notification by ID and mark it as dismissed
      const result = await Notification.findOneAndUpdate(
          { _id: notificationId, dismissed: false }, // Ensure the notification is not already dismissed
          { dismissed: true }, // Update the notification to be dismissed
          { new: true } // Return the updated document
      );

      if (!result) {
          return res.status(404).json({ success: false, message: 'Notification not found or already dismissed' });
      }

      res.status(200).json({ success: true, message: 'Notification dismissed successfully' });
  } catch (error) {
      console.error('Error dismissing notification:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));