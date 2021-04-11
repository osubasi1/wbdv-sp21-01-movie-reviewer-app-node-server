const User = require('../models/user')

const findUserById = (userId) => {
    return User.findById(userId);
}

const findAllUser = () => {
    return User.find();
}

const findUserByUserName = (userName) => {
    return User.findOne({userName: userName});
}
const findUserByEmail = (email) => {
    return User.findOne({email: email});
}

const createUser = (user) => {
    return User.create(user);
}

const updateUser = (userId, user) => {
    return User.updateOne({_id: userId}, user);
}

const deleteUser = (userId) => {
    return User.deleteOne({_id: userId});
}

const api = {
    findUserById, findAllUser,
    findUserByUserName, createUser,
    updateUser, deleteUser, findUserByEmail
}
module.exports = api;
