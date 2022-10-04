const trips = require('./trips')
const stops = require('./dashboard')
const profile = require('./profile')

module.exports = app => {
  app.use('/api/trips', trips)
  app.use('/api/dashboard', stops)
  app.use('/api/profileInfo', profile)
}