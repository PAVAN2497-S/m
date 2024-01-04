const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   image: String
})
const User = mongoose.model('User', userSchema)

module.exports = User