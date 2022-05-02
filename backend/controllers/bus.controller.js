const { User, BusStop } = require('../models');
const { Ride } = require('../models');
const { Bus } = require('../models');
const moment = require('moment');

exports.getSingleBus = async(req, res) => {
  try {
      const buses = await Bus.find({ driver: req.params.userID });
      res.json(buses);

  } catch (err) {
      res.json({ message: err });
  }
}

exports.getBuses = async(req, res) => {
  try {
      const buses = await Bus.find().populate('driver');
      res.json(buses);

  } catch (err) {
      res.json({ message: err });
  }
}

exports.createBus = async(req, res) => {
  const bus = new Bus({
      plateNumber: req.body.plateNumber,
      available: req.body.available,
      driver: req.body.driver,
      issuingDate: req.body.issuingDate,
  });
  try {
      await bus.save();
      res.status(200).send({ code: 200, message: 'Successfully created bus.' });

  } catch (err) {
      res.status(400).send(err);
  }
}