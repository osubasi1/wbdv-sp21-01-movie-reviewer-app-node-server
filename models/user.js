
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, required: true, maxlength: 100},
        lastName: {type: String, required: true, maxlength: 100},
        userName: {type: String, required: true, maxlength: 100},
        // password: {type: String, required: true},
        // email: {type: String, default:''},
        type: String, // regular user, admin, or actor


    }
);

module.exports = mongoose.model('User', UserSchema);