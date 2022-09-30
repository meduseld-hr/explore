const plans = require('./plans')

module.exports = app => {
  app.use('/plans', plans)
}