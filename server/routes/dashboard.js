const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

// GET ALL STOPS FOR A SPECIFIED TRIP

router.get('/:tripId', (req, res) => {
  const { tripId } = req.params
  const userId = req.oidc.user.sub

  db.getStops(tripId, userId)
  .then((stops) => {
    res.status(200).send(stops)
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// POST A NEW STOP TO A TRIP

router.post('/', (req, res) => {
  const stopData = req.body
  const userId = req.oidc.user.sub

  db.addStop(stopData, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// DELETE A STOP

router.delete('/:stopId', (req, res) => {
  const { stopId } = req.params
  const userId = req.oidc.user.sub

  db.deleteStop(stopId, userId)
  .then((deletedData) => {
    res.status(200).send(deletedData)
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// UPDATE A STOP'S TIMESTAMP

router.put('/time', (req, res) => {
  const stopData = req.body
  const userId = req.oidc.user.sub

  db.changeStopTime(stopData, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// UPDATE A STOP'S ORDER

router.put('/order', (req, res) => {
  const stopData = req.body
  const userId = req.oidc.user.sub

  db.changeStopOrder(stopData, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})