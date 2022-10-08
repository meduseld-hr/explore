const trips = require("./trips");
const stops = require("./dashboard");
const profile = require("./profile");
const googlePlaces = require("./googlePlaces");

module.exports = (app) => {
  app.use("/api/trips", trips);
  app.use("/api/dashboard", stops);
  app.use("/api/profileInfo", profile);
  app.use("/api/googlePlaces", googlePlaces);
};
