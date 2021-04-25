module.exports = (app) => {
    const followerService = require('../services/follower-service');
    const userService = require('../services/user-service');

    const followFan = (req, res) => {
        const fanId = req.params['fanId'];
        const user = req.body;
        const userId = user._id
        console.log('funId and userId are:', fanId, userId)
        followerService.createFollower(userId, fanId)
            .then(status => {
                res.send(status)
            })
    }
    const unFollowFan = (req, res) => {

        const user = req.body;
        const userId = user._id;
        const fanId = req.params['fanId'];
        console.log('funId is', fanId)
        console.log('userId is:', userId)
        followerService.unFollow(userId, fanId)
            .then( status => res.send(status))
    }
    const getFollowersForUser = (req, res) => {

        const userId = req.params['fanId'];
        console.log('fanId is:', userId)
        const fans = [];
        followerService.findFollowersForUser(userId)
            .then((followers) => {
                followers.map((f) => {
                    console.log('f is:', f.fan)
                    fans.push(f.fan)
                });
                res.send(fans)
            })
            .catch(() => res.sendStatus(501))
    }

    app.post('/api/fan/:fanId', followFan);
    app.delete('/api/fan/:fanId', unFollowFan);
    app.get('/api/fan/following/:fanId', getFollowersForUser)
}
