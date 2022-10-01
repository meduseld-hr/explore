const plans = require('./plans')
const stops = require('./dashboard')

module.exports = app => {
  app.use('/plans', plans)
  app.use('/api/dashboard', stops)
}