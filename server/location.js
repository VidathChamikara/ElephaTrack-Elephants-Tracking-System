const mongoose = require("mongoose");

const locationScehma = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
    currentDateTime: String,
    locationName: String,
  },
  {
    collation: "LocationInfo",
  }
);

mongoose.model("LocationInfo", locationScehma);
