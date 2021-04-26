const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser');
// const mongoDB = 'mongodb+srv://osman:osman1@cluster0.lzqji.mongodb.net/movie_reviewer?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(
    'mongodb+srv://osman:osman1@cluster0.lzqji.mongodb.net/movie_reviewer?retryWrites=true&w=majority',
    {useNewUrlParser: true} )

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
               'GET, POST, PATCH, DELETE, OPTIONS, PUT ');
    next();
});

app.use(session({
                    secret: 'any string',
                    resave: false,
                    saveUninitialized: true,

                }));
app.get('/api',  (req, res) => {
    res.send("Node server running...");
});

const setSession = (req, res) => {
    const name = req.params['name'];
    const value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

const getSession = (req, res) =>{
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}
app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);
require('./controllers/user-controller')(app);
require('./controllers/review-controller')(app);
require('./controllers/comment-controller')(app);
require('./controllers/follower-controller')(app)


app.listen(4000, () => {
    console.log("app listening on port 4000")
})
