const Follower = require('../models/follower')

/*
follower and following is kind of confusing
follower who follows following
 */
const createFollower = (userId, fanId) => {
    return Follower.create({fan: fanId, follower: userId, map: fanId + userId})
}

const findFollowersForUser = (userId) => {
    return Follower.find({follower: userId}).populate('fan')
}

const unFollow = (userId, fanId) => {
    return Follower.deleteOne({follower: userId, fan: fanId})
}
const findByMap = (userId, fanId) => {
    return Follower.findOne({map:fanId+userId})
}

const api = {
    createFollower,
    findFollowersForUser,
    unFollow,
    findByMap
}
module.exports = api;