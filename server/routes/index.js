const trips = require('./trips')
const stops = require('./dashboard')

module.exports = app => {
  app.use('/api/trips', trips)
  app.use('/api/dashboard', stops)
}