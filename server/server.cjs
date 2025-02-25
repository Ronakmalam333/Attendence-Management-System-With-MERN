const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Student, Admin, Attendance } = require("./modelSchema.cjs");

const server = express();

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

// Register Student Endpoint
server.post('/student', async (req, res) => {
    const { firstname, lastname, email, uid, password, role, course, semester } = req.body;

    try {
        const newStudent = new Student({
            firstname,
            lastname,
            email,
            uid,
            password, // Will be hashed by the pre-save hook
            role,
            course,
            semester
        });
        await newStudent.save();

        res.json({ message: "Student created successfully!", newStudent });
    } catch (error) {
        console.error("Error in /student endpoint:", error);
        res.status(500).json({
            message: "Server crashed!",
            error: error.message || "Unknown error occurred"
        });
    }
});

// Register Admin Endpoint
server.post('/admin', async (req, res) => {
    const { firstname, lastname, email, uid, password, role } = req.body;

    try {
        const newAdmin = new Admin({
            firstname,
            lastname,
            email,
            uid,
            password, // Will be hashed by the pre-save hook
            role
        });
        await newAdmin.save();

        res.json({ message: "Admin created successfully!", newAdmin });
    } catch (error) {
        console.error("Error in /admin endpoint:", error);
        res.status(500).json({
            message: "Server crashed!",
            error: error.message || "Unknown error occurred"
        });
    }
});

// Add Attendance Endpoint
server.post('/attendance', async (req, res) => {
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
            { $push: { attendance: newAttendance._id } },
            { new: true }
        );

        return res.json({ message: "Attendance updated", newAttendance });
    } catch (error) {
        console.error("Error in /attendance endpoint:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get Attendance Endpoint
server.get('/getAttendance/:id', async (req, res) => { // Corrected typo from "getAttendace"
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

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});