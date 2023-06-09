
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Car = require('./models/cars.js')



const methodOverride = require("method-override")
const indexController = require('./controllers/index.js')
const carsController = require('./controllers/cars.js')
const usersController = require('./controllers/users.js')
require('dotenv').config();


const session = require('express-session')
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the session secret')
console.log(SESSION_SECRET)

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//connect database
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true,
})


// How to connect to the database either via heroku or locally
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.set('strictQuery', true);
// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
// });

//Mongo error/success
const db = mongoose.connection

db.on('error', (err) => {
    console.log(`${err.message} is MONGODB not running?`)
})
db.on('connected', () => {
    console.log(`mongo connected`)
})
db.on('disconnected', () => {
    console.log(`mongo disconnected`)
})




// MIDDLEWARE
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))// This will allow us to make delete and put request
app.use('/', indexController)
app.use('/cars', carsController)
app.use('/users', usersController)



//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

