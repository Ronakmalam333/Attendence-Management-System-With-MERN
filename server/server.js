const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const connectDb = require('./config/db');
const student = require('./models/student');
const staff = require('./models/staff');
const attendance = require('./models/attendance');

const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.post('/signup', async (req, res) => {
    const { role, firstName, lastName, uid, email, password } = req.body;
    let name = firstName + ' ' + lastName;

    try {
        if (role === 'student') {
            const studentExist = await student.findOne({ $or: [{ email }, { uid }] });
            if (studentExist) {
                return res.status(400).send('user already exist');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new student({ name, email, uid, password: hashedPassword });
            await newUser.save();

            res.status(200).send('User Created successfully');

        } else {
            const staffExist = await staff.findOne({ $or: [{ email }, { uid }] });
            if (staffExist) {
                return res.status(400).send('user already exist');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new staff({ name, email, uid, password: hashedPassword });
            await newUser.save();

            res.status(200).send('User Created successfully');
        }
    }
    catch (error) {
        console.error("error", error);
    }
})

app.post('/login', async (req, res) => {
    const { role, username, password } = req.body;

    try {
        if (role === 'student') {
            const studentExist = await student.findOne({ $or: [{ uid: username }, { email: username }] });
            if (studentExist) {
                const studentMatch = await bcrypt.compare(password, studentExist.password);
                if (studentMatch) {
                    return res.json({ message: "Login Successful" });
                }
            }
        } else {
            const staffExist = await staff.findOne({ $or: [{ uid: username }, { email: username }] });
            console.log(staffExist)
            if (staffExist) {
                const staffMatch = await bcrypt.compare(password, staffExist.password);
                if (staffMatch) {
                    return res.json({ message: "Login Successful" });
                }
            }
        }
        return res.json({ message: "Invalid credentials" });
    }
    catch (error) {
        console.error(error);
    }
})

app.post('/data', async (req, res) => {
    const { duration } = req.body;
    console.log(req.body);

    const data = await attendance.find({ duration });
    console.log(data)
    res.json(data);
})

app.get('/students', async (req, res) => {
    const data = await student.find();
    res.json(data)
})


app.listen(4000, () => console.log('listening on http://localhost:4000'));