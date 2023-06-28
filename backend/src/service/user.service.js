import sequelize from '../connection.js'
import UserModel from '../model/user.model.js'

const listar = async function (textoBuscar) {
  try {
    const users = await sequelize.query(`SELECT * 
      FROM users 
      WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
        AND deleted IS false
      ORDER BY id`)

    if (users && users[0]) {
      return users[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const consultarPorCodigo = async function (codigo) {
  try {
    const userModelResult = await UserModel.findByPk(codigo)
    if (userModelResult) {
      return userModelResult
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const actualizar = async function (
  id,
  name,
  last_name,
  avatar,
  email,
  password,
  deleted
) {
  let userReturn = null
  const data = { id, name, last_name, avatar, email, password, deleted }
  try {
    let userExist = null
    if (id) {
      userExist = await UserModel.findByPk(id)
    }
    if (userExist) {
      userReturn = await UserModel.update(data, { where: { id: id } })
      userReturn = data
    } else {
      data.deleted = 0
      userReturn = await UserModel.create(data)
    }
    return userReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    await sequelize.query('UPDATE users SET deleted=true WHERE id= ' + codigo)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
}
