const mongoose = require('mongoose');

const ZoneSchema = require('./models/zone');
const RouteSchema = require('./models/route');
const RideSchema = require('./models/ride');
const UserSchema = require('./models/user');
const BusSchema = require('./models/bus');
const BusStopSchema = require('./models/busStop');

module.exports = {
    Zone: mongoose.model('Zone', ZoneSchema),
    BusRoute: mongoose.model('Route', RouteSchema),
    Ride: mongoose.model('Rides', RideSchema),
    User: mongoose.model('User', UserSchema),
    Bus: mongoose.model('Bus', BusSchema),
    BusStop: mongoose.model('BusStop', BusStopSchema)
}