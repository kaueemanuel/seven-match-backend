import { Sequelize } from 'sequelize'
const databaseConfig = require('../config/database')

const sequelize = new Sequelize(databaseConfig)

export default sequelize
