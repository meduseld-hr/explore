const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;


router.get('/', async (req, res) => {

  const userId = req.oidc.user.sub;
  console.log(userId);
  db.getTrips(userId).then(response => {
    console.log('Trips response: ', response);
    res.status(200).send(response);
  })
  .catch(err => console.log('Error getting trips', err))
})