const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
})

// create User model using the schema
const User = mongoose.model('User', userSchema, 'Users')

module.exports = User