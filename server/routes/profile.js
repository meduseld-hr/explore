const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

// get userInfo
router.get('/info', (req, res) => {
  const userId = req.oidc.user.sub;
  db.getUserInfo(userId)
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).end()
  })
})

//create new user
router.post('/', (req, res) => {
  const userId = req.oidc.user.sub;
  const nickname = req.oidc.user.nickname;
  const picture = req.oidc.user.picture;
  const givenName = req.oidc.user.given_name;
  db.insertUser(userId, nickname, picture, givenName)
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// get trips by user

// update Nickname
router.patch('/updateNickname', (req, res) => {
  const updatedValue = req.body.nickname;
  const userId = req.oidc.user.sub;
  db.updateUserName(userId, updatedValue)
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).end()
  })
})

// update user profilePIC
router.patch('/updateProfilePic', (req, res) => {
  const updatedValue = req.body.picture;
  const userId = req.oidc.user.sub;
  db.updateUserPic(userId, updatedValue)
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).end()
  })
})