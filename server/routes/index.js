const trips = require('./trips')

module.exports = app => {
  app.use('/api/trips', trips)
}