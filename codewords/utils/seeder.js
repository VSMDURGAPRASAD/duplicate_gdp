// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')

// require each data file


const instructors = require('../data/instructors.json')


// inject the app to seed the data

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  // Customers don't depend on anything else...................

  
  // Products don't depend on anything else .....................

  db.instructors = new Datastore()
  db.instructors.loadDatabase()

  // insert the sample data into our data store
  db.instructors.insert(instructors)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.instructors = db.instructors.find(instructors)
  LOG.debug(`${app.locals.instructors.query.length} instructors seeded`)

  // Orders need a customer beforehand .................................

  

  // extra...

  

  LOG.info('END Seeder. Sample data read and verified.')
}
