const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');

async function run() {
    await mongoose.connect('mongodb://localhost:27017/lms');
    const s = await User.findOne({ name: "don" });
    const token = jwt.sign({ id: s._id }, "secret_key_change_this_later", { expiresIn: "30d" });
    const c = await Course.findOne({ title: /Physics/ });
    
    const res = await fetch(`http://localhost:5000/api/student/courses/${c._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(res.status);
    console.log(await res.text());
    process.exit(0);
}
run();
