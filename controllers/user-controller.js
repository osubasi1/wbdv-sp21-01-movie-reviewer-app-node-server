module.exports = (app) => {

    const userService = require('../services/user-service');

    // this is async so we need to wait promise and then response
    const findAllUsers = (req, res) => {
        console.log("findAllUser")
        userService.findAllUser()
            .then((users) => {
                res.send(users);
            })
    }

    const findUserByUserName = (req, res) => {
        const userName = req.params['userName']
        userService.findUserByUserName(userName)
            .then(response => {
                if(response === null){
                    res.sendStatus(500)
                }else
                {
                    res.send(response)
                }
            })
    }
    const findUserById = (req, res) => {
        const userId = req.params['userId'];
        userService.findUserById(userId)
            .then(user => {
                res.json(user);
            })
    }
    const createUser = (req, res) => {
        const user = req.body;
        userService.findUserByUserName(user.userName)
            .then(response => {
                if(response === null){
                    // TODO: maybe we can directly login user when they create a profile here.
                    userService.createUser(user)
                        .then(res.send(user))
                }
                else
                {
                    res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
                }
            }

            )
    }

    app.get('/api/users', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/:userName', findUserByUserName)
    app.post('/api/user', createUser);
}
