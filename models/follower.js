const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const
    FollowerSchema = new Schema(
    {
        fan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        map: {
            type: String,
            unique: true
        }
    }, {collection: 'follower'}
    )

module.exports = mongoose.model('Followers', FollowerSchema);