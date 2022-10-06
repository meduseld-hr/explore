const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();
const axios = require('axios');
module.exports = router;


router.get('/', (req, res) => {

  const userId = req.oidc.user.sub;
  db.getTrips(userId).then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    console.log('Error getting trips', err)
    res.status(404).end();
  })
})

router.get('/searchPlaceID', (req, res) => {
  const placeID = req.query.placeID;
  db.searchTrips(placeID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log('Error getting trips', err)
      res.status(404).end();
    })
})

router.get('/searchTripsByName', (req, res) => {
  const placeName = req.query.placeName + '%';
  db.searchTripsByName(placeName)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log('Error getting trips', err)
      res.status(404).end();
    })
})


router.post('/', (req, res) => {
  const tripData = req.body;
  const userId = req.oidc.user.sub;

  const searchString = req.body.tripName;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchString}&inputtype=textquery&key=${process.env.GPLACES}`;

  let options = {
    method: "GET",
    url: url,
  };

  axios(options)
    .then((response) => {
      const googlePlaceId = response.data.candidates[0].place_id
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
        googlePlaceId +
        "&key=" +
        process.env.GPLACES;
      let options = {
        method: "GET",
        url: url,
      };
      axios(options)
        .then((response) => {
          let photo = response.data.result.photos[0].html_attributions[0];
          let arr = photo.split('=')
          photo = arr[1];
          arr = photo.split('>')

          thumbnailUrl = arr[0]
          tripData.completed = false;
          tripData.public = true;


          db.addTrip(tripData, googlePlaceId, thumbnailUrl, userId)
          .then(response => {
            // console.log('I ADDED A TRIP')
            let tripId = response[0]
            res.status(200).send(tripId);
          })
          .catch(err => {
            res.status(404).end();
          })
        })
        .catch((err) => {
          res.status(500).send(err);
        });



    })
    .catch((err) => {
      res.status(500).send(err);
    });

})

router.get('/popular', (req, res) => {

  db.getPopularTrips()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.get('/recent', (req, res) => {

  db.getRecentTrips()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.get('/recommended', (req, res) => {

  db.getRecommendedTrips()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.delete('/:tripId', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.deleteTrip(tripId, userId)
  .then(response => {
    res.status(200).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/completed', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.markTripCompleted(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/incomplete', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.markTripIncomplete(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/name', (req, res) => {
  const { newTripName } = req.body
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.changeTripName(tripId, newTripName, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/origin', (req, res) => {
  const tripData = req.body
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.changeTripOrigin(tripId, tripData, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/public', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.markTripPublic(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/private', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.markTripPrivate(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})