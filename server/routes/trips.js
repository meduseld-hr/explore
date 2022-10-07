const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();
const axios = require('axios');
module.exports = router;

router.get('/:tripId/singleTripInfo' , (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.getSingleTripInfo(parseInt(tripId), userId)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(404).end();
    })
})

router.get('/copyTrip/:tripId', (req, res) => {
  const { tripId } = req.params;
  console.log('trip id?', req.params)
  db.getTripToCopy(tripId)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(404).send(err);
    })
})


router.post('/:tripId', (req, res) => {
  const tripData = req.body;
  const googlePlaceId = req.body.placeID
  const img_url = req.body.thumbnailURL
  const userId = req.oidc.user.sub;
  tripData.completed = false;
  tripData.public = true;

  db.addTrip(tripData, googlePlaceId, img_url, userId)
  .then(response => {
    console.log('I added a trip ln 32 in server/routes/trips.js ')
    let tripId = response[0]
    res.status(200).send(tripId);
  })
  .catch(err => {
    console.log('no trip', err)
    res.status(404).send(err);
  })
})

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
          let photo = response.data.result.photos[0].photo_reference;
          // const photo_reference = response.data.result.photos[0].photo_reference;
          let img_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GPLACES}`;

          tripData.completed = false;
          tripData.public = true;

          db.addTrip(tripData, googlePlaceId, img_url, userId)
          .then(response => {

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

  db.deleteTrip(parseInt(tripId), userId)
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

router.put('/:tripId/like', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.likeTrip(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})

router.put('/:tripId/unlike', (req, res) => {
  const { tripId } = req.params;
  const userId = req.oidc.user.sub;

  db.unlikeTrip(tripId, userId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
})