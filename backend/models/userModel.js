let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Yugandar:c2TWbTBF9cpqpy5Q@cluster0.6yfk7tq.mongodb.net/codeIDE')        // Connecting to MongoDB Atlas using Mongoose

let userSchema = new mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports= mongoose.model('User', userSchema);  // Exporting the User model, 'User' is the name of the collection in MongoDB