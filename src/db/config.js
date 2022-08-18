const sqlie3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () => {
  open({
    filename: '/src/db/rocketq.sqlite',
    driver: sqlie3.Database
  })
}