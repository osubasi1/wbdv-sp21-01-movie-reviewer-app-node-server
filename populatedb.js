/*
    This is a script to add some users to database for test purpose.
    To use scrip just run node populatedb <server_url> in the command line in the root directory
*/

console.log('This script populates some test users to database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');
const User = require('./models/user');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];

/*
        firstName: {type: String, required: true, maxlength: 100},
        lastName: {type: String, required: true, maxlength: 100},
        userName: {type: String, required: true, maxlength: 100},
        password: {type: String, required: true},
        email: {type: String, default:''},
        type: String, // regular user, admin, or actor
 */
function userCreate(firstName, lastName, userName, password, email, type, cb) {
    userdetail = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        email: email,
        type: type,
    }

    const user = new User(userdetail);
    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    }  );
}

function createUsers(cb) {
    async.parallel([
                       function(callback) {
                           userCreate('aaa', 'bbb', 'aaabbb', '123', 'aaa@bbb.com','user', callback);
                       },
                       function(callback) {
                           userCreate('aaa1', 'bbb1', 'aaabbb1', '1231', 'aaa1@bbb.com','user', callback);
                       },
                       function(callback) {
                           userCreate('aaa2', 'bbb2', 'aaabbb2', '1232', 'aaa2@bbb.com','user', callback);
                       },
                       function(callback) {
                           userCreate('aaa3', 'bbb3', 'aaabbb3', '1233', 'aaa3@bbb.com','actor', callback);
                       },
                       function(callback) {
                           userCreate('aaa4', 'bbb4', 'aaabbb4', '1234', 'aaa4@bbb.com','admin', callback);
                       },
                       function(callback) {
                           userCreate('aaa5', 'bbb5', 'aaabbb5', '1235', 'aaa5@bbb.com','user', callback);
                       },
                       function(callback) {
                           userCreate('aa65', 'bbb6', 'aaabbb6', '1236', 'aaa6@bbb.com','user', callback);
                       }
                   ],
                   // optional callback
                   cb);
}

async.series([
                 createUsers,
             ],
             // Optional callback
             function(err, results) {
                 if (err) {
                     console.log('FINAL ERR: '+err);
                 }
                 mongoose.connection.close();
             });



