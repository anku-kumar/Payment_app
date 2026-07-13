const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ak:ak12345@cluster0.udvluvo.mongodb.net/payment_app')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    password_hash: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
})


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
};