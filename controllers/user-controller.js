module.exports = (app) => {

    const userService = require('../services/user-service');

    // this is async so we need to wait promise and then response
    const findAllUsers = (req, res) => {
        userService.findAllUser()
            .then((users) => {
                res.send(users);
            })
    }

    const updateUser = (req, res) => {
            const user = req.body;

            const userId = user.userID
            const userFName = user.firstName;
            const userLName = user.lastName;
            const userType = user.type
            userService.updateUser(userId, userFName, userLName, userType)
                .then( (response) => res.send(response));
        }

    const findUserByUserName = (req, res) => {
        const userName = req.params['userName']
        userService.findUserByUserName(userName)
            .then(response => {
                if (response === null) {
                    res.sendStatus(500)
                } else {
                    res.send(response)
                }
            })
    }
    const findUserByEmail = (req, res) => {
        console.log('findUserByEmail')
        const email = req.params['email']
        userService.findUserByEmail(email)
            .then(response => {
                if (response === null) {
                    res.sendStatus(500)
                } else {
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
                    userService.createUser(user)
                        .then(status => {
                        res.send(status._id);
                    })
                }
                else {
                    res.send(response._id)
                }
            })



    }

    app.get('/api/users', findAllUsers);
    app.get('/api/users/:userId', findUserById);
    app.get('/api/users/:userName', findUserByUserName)
    app.post('/api/users', createUser);
    app.get('/api/users/:email', findUserByEmail);
    app.put('/api/users', updateUser)
}
