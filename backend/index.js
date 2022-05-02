const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { User, BusStop } = require('./models');
const { Ride } = require('./models');
const { Bus } = require('./models');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const moment = require('moment');

const busRoutesController = require("./controllers/busroutes.controller");
const userController = require("./controllers/users.controller");
const ridesController = require("./controllers/rides.controller");
const zonesController = require("./controllers/zones.controller");
const busController = require("./controllers/bus.controller");

// MIDDLEWARES 
app.use(express.json());
app.use(cors());

// CONNECT TO DB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB CONNECTED!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
})

app.get('/', (req, res) => {
        res.status(200).send("Simple bus transport API");
});

//! ----- ROUTES FOR USERS ------
app.post('/api/users/register', userController.register);

// app.post('/api/users/login', userController.login);
//! ----- Add Bus stop Route ------
app.post('/api/busstop/addroute', busRoutesController.addRoute);
// GET SPECIFIC USER
app.get('/api/users/:userID', userController.getUser);



//! ----- ROUTES FOR RIDES ------
app.post('/api/rides/request', ridesController.requestRide);

// GET ALL RIDE REQUESTS
app.get('/api/rides', ridesController.getAllRides);

// GET A SPECIFIC USER'S RIDES
app.get('/api/rides/:userID', ridesController.userRides);



//! ----- ROUTES FOR BUSES ------
app.post('/api/buses', busController.createBus)

// GET ALL BUSES
app.get('/api/buses', busController.getBuses);

// GET A SPECIFIC DRIVER'S BUSES
app.get('/api/buses/:userID', busController.getSingleBus);

//! ----- Search For Buses ------
app.post('/api/bus/search', busRoutesController.busSearch);

//! ----- ROUTES FOR BUS STOPS ------

//! ----- ROUTES FOR ZONES ------

app.listen(process.env.PORT || 5000);