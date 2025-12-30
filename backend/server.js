import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { isAuthenticated } from './authentication.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const ProfileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  DOB: String,
  age: Number,
  TotalDays: Number,
  LastDate: String,
  LastsUpto: Number
});
const DailyUpdateSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  flowing: String,
  spotting: String,
  feelings: String,
  pain_level: String,
  sleep_quality: String,
  energy: String,
  mind: String,
  skin: String,
  hair: String
});

const User = mongoose.model('User', UserSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const DailyUpdate = mongoose.model('DailyUpdate', DailyUpdateSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello server");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    req.session.user = { email, _id: user._id };
    return res.status(200).json({ success: true, redirectUrl: '/home' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    req.session.user = { email, _id: newUser._id };
    res.status(200).json({ success: true, redirectUrl: '/signup/form' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Signup failed', error });
  }
});

app.post("/signup/form", isAuthenticated, async (req, res) => {
  const { DOB, age, TotalDays, LastDate, LastsUpto } = req.body;
  const profile = new Profile({
    userId: req.session.user._id,
    DOB, age, TotalDays, LastDate, LastsUpto
  });
  await profile.save();
  res.status(200).json({ success: true, redirectUrl: '/home' });
});

app.post("/calendar/updates", isAuthenticated, async (req, res) => {
  try {
    const { flowing, spotting, feelings, pain_level, sleep_quality, energy, mind, skin, hair } = req.body;
    const update = new DailyUpdate({
      userId: req.session.user._id,
      flowing, spotting, feelings, pain_level, sleep_quality, energy, mind, skin, hair
    });
    await update.save();
    res.status(200).json({ success: true, message: "Daily update saved" });
  } catch (err) {
    console.error("Error saving daily update:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Fetch Profile
app.get('/home/profile', isAuthenticated, async (req, res) => {
  const userId = req.session.user?._id;
  const user = await User.findById(userId).select('name email');
  const profile = await Profile.findOne({ userId });
  if (!user || !profile) {
    return res.status(404).json({ message: "User or profile not found" });
  }
  res.status(200).json({
    name: user.name,
    email: user.email,
    dob: profile.DOB,
    age: profile.age,
    cycleStart: profile.LastDate,
    cycleDuration: profile.LastsUpto
  });
});

app.post('/home/profile/update', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { name, dob, cycleStart, cycleDuration } = req.body;

    const user = await User.findById(userId);
    const profile = await Profile.findOne({ userId });

    if (!user || !profile) {
      return res.status(404).json({ success: false, message: "User or profile not found" });
    }

    // ✅ Update fields
    if (name) user.name = name;
    if (dob) profile.DOB = dob;
    if (cycleStart) profile.LastDate = cycleStart;
    if (cycleDuration) profile.LastsUpto = cycleDuration;

    await user.save();
    await profile.save();

    return res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Latest Daily Update for fallback
app.get('/pcos/latest-data', isAuthenticated, async (req, res) => {
  try {
    const update = await DailyUpdate.findOne({ userId: req.session.user._id }).sort({ date: -1 });
    if (!update) {
      return res.status(404).json({ success: false, message: "No daily updates found" });
    }
    res.status(200).json(update);
  } catch (err) {
    console.error("Error fetching latest daily update:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Prediction
app.post('/pcos/predict', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const latestUpdate = await DailyUpdate.findOne({ userId }).sort({ date: -1 });
    const profile = await Profile.findOne({ userId });

    if (!latestUpdate || !profile) {
      return res.status(404).json({ error: "Insufficient data for prediction" });
    }

    const predictionInput = {
      How_was_your_flowing: latestUpdate.flowing,
      Any_Spotting_or_irregular_spotting: latestUpdate.spotting,
      What_is_your_pain_level: latestUpdate.pain_level,
      How_was_your_sleep_quality: latestUpdate.sleep_quality,
      How_you_feel_about_your_skin: latestUpdate.skin,
      How_you_feel_about_your_hair: latestUpdate.hair,
      Your_cycle_last_upto: profile.LastsUpto || 5,
      Number_of_days_of_menstrual_cycle: profile.TotalDays || 28
    };

    const flaskRes = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(predictionInput)
    });

    const data = await flaskRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Flask model:', error);
    res.status(500).json({ error: 'Model server not responding' });
  }
});

// Home Page Info
app.get("/home", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.user._id).select("name");
  const profile = await Profile.findOne({ userId: req.session.user._id });
  res.status(200).json({
    success: true,
    name: user.name,
    totalDays: profile.TotalDays,
    lastDate: profile.LastDate,
    message: "You are at home"
  });
});

// 🩸 Smart Cycle Tracking Route
app.get("/home/cycle-status", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    const totalDays = profile.TotalDays || 28;
    const lastDate = new Date(profile.LastDate);
    const today = new Date();
    // Calculate next expected cycle
    const expectedDate = new Date(lastDate);
    expectedDate.setDate(expectedDate.getDate() + totalDays);
    // Difference in days
    const diffInMs = today - expectedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    // Case 1: Period expected today (same date)
    if (today.toDateString() === expectedDate.toDateString()) {
      return res.status(200).json({
        success: true,
        status: "expected_today",
        message: "Period expected today. Confirm if it started.",
        expectedDate: expectedDate.toISOString().split("T")[0],
      });
    }
    // Case 2: Period is late (date has passed)
    if (today > expectedDate) {
      return res.status(200).json({
        success: true,
        status: "delayed",
        message: `Your period is delayed by ${diffInDays} day(s).`,
        expectedDate: expectedDate.toISOString().split("T")[0],
        daysDelayed: diffInDays,
      });
    }
    // Case 3: Still waiting before next cycle
    const daysRemaining = Math.ceil(
      (expectedDate - today) / (1000 * 60 * 60 * 24)
    );
    return res.status(200).json({
      success: true,
      status: "upcoming",
      message: `Next cycle expected in ${daysRemaining} day(s).`,
      expectedDate: expectedDate.toISOString().split("T")[0],
      daysRemaining,
    });
  } catch (error) {
    console.error("Error checking cycle status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ User confirms if period started or not
app.post("/home/cycle-confirm", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { periodStarted } = req.body; // true or false
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    const today = new Date();
    if (periodStarted) {
      // Reset cycle: today becomes new LastDate
      profile.LastDate = today.toISOString().split("T")[0];
      await profile.save();
      return res.status(200).json({
        success: true,
        message: "Cycle reset successfully for new period start.",
        lastDate: profile.LastDate,
      });
    } else {
      // Just return info that it’s delayed (no reset)
      const totalDays = profile.TotalDays || 28;
      const expectedDate = new Date(profile.LastDate);
      expectedDate.setDate(expectedDate.getDate() + totalDays);
      const diffInDays = Math.floor(
        (today - expectedDate) / (1000 * 60 * 60 * 24)
      );
      return res.status(200).json({
        success: true,
        message: `Cycle delayed by ${diffInDays} day(s).`,
        daysDelayed: diffInDays,
      });
    }
  } catch (error) {
    console.error("Error confirming period:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Route guards
app.get('/login', (req, res) => {
  if (req.session.user) return res.status(401).json({ success: false, message: "Unauthorized" });
  res.status(200).json({ message: "Login page access granted" });
});

const subroutes = [
  "/signup/form", "/home/:subroute",
  "/calendar", "/calendar/:subroute",
  "/health", "/health/:subroute",
  "/exercise", "/exercise/:subroute"
];
subroutes.forEach(route => {
  app.get(route, isAuthenticated, (req, res) => {
    res.status(200).json({ message: `You are at ${req.params.subroute || "this route"}` });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
