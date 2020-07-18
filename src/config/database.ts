const mysql2 = require('mysql2')
module.exports = {
  dialectModule: mysql2,
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'sevenmatch',
  define: {
    timestamps: true,
    underscored: true
  }
}
