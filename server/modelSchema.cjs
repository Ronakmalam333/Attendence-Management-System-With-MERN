const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Student Schema
const studentSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    uid: { type: String },
    password: { type: String },
    role: { type: String },
    course: { type: String },
    semester: { type: String }, // Corrected typo from "semister"
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }]
});

// Pre-save hook to hash student password
studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Admin Schema
const adminSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    uid: { type: String },
    password: { type: String },
    role: { type: String }
});

// Pre-save hook to hash admin password
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
    studentId: { type: String },
    subject: { type: String },
    date: { type: String },
    present: { type: Number, enum: [0, 1], default: 0 }
});

const GeneratedTokenSchema = new mongoose.Schema({
    course: String,
    semester: String,
    subject: String,
    date: String,
    generatedtoken: String  // Changed from 'token' to 'generatedtoken'
});

// Models
const Student = mongoose.model('Student', studentSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const GeneratedToken = mongoose.model('Token', GeneratedTokenSchema);

module.exports = {
    Student,
    Admin,
    Attendance,
    GeneratedToken
};

