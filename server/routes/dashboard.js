const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

// GET ALL STOPS, MESSAGES, AND COMMENTS FOR A SPECIFIED TRIP

router.get('/:tripId', (req, res) => {
  const { tripId } = req.params
  const userId = req.oidc.user.sub

  Promise.all([db.getStops(tripId, userId), db.getMessages(tripId), db.getComments(tripId)])
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(404).end();
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

router.put('/:stopId/time', (req, res) => {
  const { newTime } = req.body
  const { stopId } = req.params
  const userId = req.oidc.user.sub

  db.changeStopTime(stopId, newTime, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// UPDATE A STOP'S ORDER

router.put('/:stopId/decrease', (req, res) => {
  const { tripId } = req.body
  const { stopId } = req.params
  const userId = req.oidc.user.sub

  db.decreaseStopOrder(stopId, tripId, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})

router.put('/:stopId/increase', (req, res) => {
  const { tripId } = req.body
  const { stopId } = req.params
  const userId = req.oidc.user.sub

  db.increaseStopOrder(stopId, tripId, userId)
  .then(() => {
    res.status(201).end()
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// POST CHAT MESSAGES FOR A SPECIFIED TRIP

router.post('/:tripId/chat', (req, res) => {
  const messageData = {
    body: req.body.body,
    tripId: req.params.tripId,
    userId: req.oidc.user.sub,
    timeStamp: Math.floor(req.body.timeStamp / 1000)
  }
  db.addMessage(messageData)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(501).end();
    })
});

// SEARCH FOR USER TO ADD TO TRIP

router.get('/search', (req, res) => {
  const { searchTerm } = req.body

  db.searchUser(searchTerm)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    res.status(404).end();
  })
})

// ADD USER TO TRIP

router.post('/:tripId/addUser', (req, res) => {
  const { addedUserID } = req.body
  const { tripId } = req.params
  const authUserId = req.oidc.user.sub

  db.addUserToTrip(tripId, addedUserID, authUserId)
  .then(response => {
    res.status(201).end();
  })
  .catch(err => {
    res.status(404).end();
  })
});

// POST COMMENTS FOR A SPECIFIED TRIP

router.post('/:tripId/comment', (req, res) => {
  const commentData = {
    body: req.body.body,
    tripId: req.params.tripId,
    userId: req.oidc.user.sub,
    timeStamp: Math.floor(req.body.timeStamp / 1000)
  }
  db.addComment(commentData)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(501).end();
    })
});