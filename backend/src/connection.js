const { Sequelize } = require('sequelize')
//el sequileze que se recupera debe ser en minuscula, pq hay dos sequelize
//db, user, password
const sequelize = new Sequelize('db_study_app', 'postgres', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

const testConnection = function () {
  try {
    sequelize.authenticate()
    console.log('Conexion con exito')
  } catch (error) {
    console.log('Error de conexion', error)
  }
}

testConnection()

module.exports = {
  Sequelize,
  sequelize,
}
