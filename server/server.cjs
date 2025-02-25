const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Student, Admin, Attendance } = require("./modelSchema.cjs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server = express();
const SECRET_KEY = 'mysecretkey'; // Replace with secure key in production (e.g., from .env)

server.use(cors());
server.use(express.json());

const mongoDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/studentDb');
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

mongoDb();

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Registration Endpoints
server.post('/student', async (req, res) => {
  const { firstname, lastname, email, uid, password, role, course, semester } = req.body;

  try {
    const newStudent = new Student({
      firstname,
      lastname,
      email,
      uid,
      password,
      role,
      course,
      semester
    });
    await newStudent.save();

    res.json({ message: "Student created successfully!", newStudent });
  } catch (error) {
    console.error("Error in /student endpoint:", error);
    res.status(500).json({ message: "Server crashed!" });
  }
});

server.post('/admin', async (req, res) => {
  const { firstname, lastname, email, uid, password, role } = req.body;

  try {
    const newAdmin = new Admin({
      firstname,
      lastname,
      email,
      uid,
      password,
      role
    });
    await newAdmin.save();

    res.json({ message: "Admin created successfully!", newAdmin });
  } catch (error) {
    console.error("Error in /admin endpoint:", error);
    res.status(500).json({ message: "Server crashed!" });
  }
});

// Login Endpoint with JWT
server.post('/login', async (req, res) => {
  const { identifier, password, role } = req.body;

  let userModel;
  if (role === 'student') {
    userModel = Student;
  } else if (role === 'staff') {
    userModel = Admin;
  } else {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { uid: identifier }]
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, firstname: user.firstname, lastname: user.lastname, role: user.role }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Attendance Endpoints with Token Protection
server.post('/attendance', verifyToken, async (req, res) => {
  const { studentId, subject, date, present } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newAttendance = new Attendance({
      studentId,
      subject,
      date,
      present
    });

    await newAttendance.save();

    await Student.findByIdAndUpdate(
      studentId,
      { $push: { attendance: newAttendance._id } }
    );

    return res.json({ message: "Attendance updated", newAttendance });
  } catch (error) {
    console.error("Error in /attendance endpoint:", error);
    res.status(500).json({ message: error.message });
  }
});

server.get('/getAttendance/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("attendance");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ student });
  } catch (error) {
    console.error("Error in /getAttendance endpoint:", error);
    res.status(500).json({ message: error.message });
  }
});

server.get('/profile', verifyToken, async (req, res) => {
  try {
    const { id, role } = req.user;
    const userModel = role === 'student' ? Student : Admin;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userData = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      uid: user.uid,
      ...(role === 'student' && {
        course: user.course,
        semester: user.semester
      })
    };
    res.json(userData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User Profile
server.put('/profile', verifyToken, async (req, res) => {
  try {
    const { id, role } = req.user;
    const { firstname, lastname, email, course, semester } = req.body;
    const userModel = role === 'student' ? Student : Admin;

    const updateData = {
      firstname,
      lastname,
      email,
      ...(role === 'student' && { course, semester })
    };

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});