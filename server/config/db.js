const mongoose = require('mongoose');

const URI = 'mongodb+srv://kjugendra63:jugendra@attendance.vlvtd.mongodb.net/attendance';

function connectDb() {
    mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
}

module.exports = connectDb;