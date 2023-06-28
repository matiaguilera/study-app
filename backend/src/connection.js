import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('db_study_app', 'postgres', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

const testConnection = function () {
  try {
    sequelize.authenticate()
    console.log('Conexión exitosa')
  } catch (error) {
    console.log('Error de conexión', error)
  }
}

testConnection()

export default sequelize
