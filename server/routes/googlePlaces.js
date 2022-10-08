const Router = require("express-promise-router");
const axios = require("axios");
require("dotenv").config();

const router = new Router();

module.exports = router;

router.get("/placeinfo", async (req, res) => {
  const placeID = req.query.placeID;
  const url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    placeID +
    "&key=" +
    process.env.GPLACES;
  let options = {
    method: "GET",
    url: url,
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/placesearch", async (req, res) => {
  const searchString = req.query.destination;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchString}&inputtype=textquery&key=${process.env.GPLACES}`;
  let options = {
    method: "GET",
    url: url,
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
