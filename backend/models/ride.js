const mongoose = require('mongoose')


//! ----- RIDE MODEL -----
const RideSchema = mongoose.Schema({
  passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  pickupTime: {
      type: Date,
      required: true,
  },
  departureLocation: {
      type: String,
      required: true,
  },
  destinationLocation: {
      type: String,
      required: true,
  },
  numberOfSits: {
      type: Number,
      required: true,
  },
  disabledPeople: {
      type: Number,
      required: true,
  },
}, {
  timestamps: true
});
