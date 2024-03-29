const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

const runMigrations = async () => {
  const path = '/home/rauhalar/Git/fullstack-part13/src/migrations/*.js'
  const migrator = new Umzug({
    migrations: {
      glob: path,
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })

  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to the database')
  } catch (error) {
    console.log('Failed to connect to the database')
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize }
