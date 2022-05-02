const { User, BusStop } = require('../models');
const { Ride } = require('../models');
const { Bus } = require('../models');
const moment = require('moment');

exports.addRoute =  async(req, res) => {
    const busStop = new BusStop({
        datetime: Date.parse(req.body.time),
        name: req.body.name,
        destinations: req.body.destination,
        zone: req.body.zone,
        bus: req.body.bus
    });
    try {
        await busStop.save();
        res.status(200).send({ code: 200, message: 'Successfully added bus stop route.' });

    } catch (err) {
        res.status(400).send(err);
    }
};


exports.busSearch = async(req, res) => {

  const buses = await BusStop.find();
  
  const filteredBuses = buses
  .map(filtered_bus_stop => {
      let response = JSON.parse(JSON.stringify(filtered_bus_stop))

      response.departure_time = moment(filtered_bus_stop.datetime).format('LT');
      return response;
  })
  res.status(200).send({ code: 200, message: filteredBuses });
}