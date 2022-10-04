const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;


router.get('/', (req, res) => {

  const userId = req.oidc.user.sub;
  console.log(userId);
  db.getTrips(userId).then(response => {
    console.log('Trips response: ', response);
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

  db.addTrip(tripData, userId)
  .then(response => {
    res.status(200).end();
  })
  .catch(err => {
    res.status(404).end();
  })
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