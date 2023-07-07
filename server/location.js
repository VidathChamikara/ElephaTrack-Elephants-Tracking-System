const mongoose = require("mongoose");

const locationScehma = new mongoose.Schema(
  {
    latitude:  Number,
    longitude: Number,
    
  },
  {
    collation: "LocationInfo",
  }
);

mongoose.model("LocationInfo",locationScehma);