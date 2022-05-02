const mongoose = require('mongoose')

//! ----- BUS STOP MODEL -----
const BusStopSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  datetime: {
      type: Date,
      required: true,
  },
  destinations: {
      type: [String],
      required: true,
  },
  zone: {
      //type: mongoose.Schema.Types.ObjectId, //This was intended to be reference to the zone schema. So if we get to implement the Bus Schema. We should update this property, alongside its reference property which is the next propert
      //ref: 'Zone',
      type: String,
      required: true

  },
  bus: {
      //type: mongoose.Schema.Types.ObjectId, //This was intended to be reference to the zone schema. So if we get to implement the Zone Schema. We should update this property, alongside its reference property which is the next y
      //ref: 'Bus',
      type: String,
      required: true
  },
}, {
  timestamps: true
});