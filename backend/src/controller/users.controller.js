import sequelize from '../connection.js'
import UserService from '../service/user.service.js'
import jwt from 'jsonwebtoken'

const listar = async function (req, res) {
  try {
    const users = await UserService.listar(req.query.filtro || '')
    if (users) {
      res.json({
        success: true,
        usuarios: users,
      })
    } else {
      res.json({
        success: true,
        usuarios: [],
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

const consultarPorCodigo = async function (req, res) {
  try {
    const userModelResult = await UserService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (userModelResult) {
      res.json({
        success: true,
        usuario: userModelResult,
      })
    } else {
      res.json({
        success: true,
        usuario: [],
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

const actualizar = async function (req, res) {
  let userReturn = null
  try {
    userReturn = await UserService.actualizar(
      req.body.id,
      req.body.name,
      req.body.last_name,
      req.body.avatar,
      req.body.email,
      req.body.password,
      req.body.deleted
    )
    res.json({
      success: true,
      user: userReturn,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

const eliminar = async function (req, res) {
  try {
    await UserService.eliminar(req.params.filtro || '')
    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

const login = async function (req, res) {
  try {
    const userDB = await sequelize.query(
      "SELECT * FROM users WHERE email ='" +
        req.body.email +
        "' AND password =  '" +
        req.body.password +
        "'"
    )
    if (userDB.length > 0 && userDB[0].length > 0) {
      const { id, name, last_name, avatar, email } = userDB[0][0]
      let token = jwt.sign(
        {
          id,
          name,
          last_name,
          avatar,
          email,
        },
        'passwd'
      )
      await sequelize.query(
        `UPDATE users SET token = '${token}' WHERE id = '${id}' `
      )
      res.json({
        success: true,
        token,
      })
    } else {
      res.json({
        success: false,
        error: 'Usuario no encontrado',
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

const logout = async function (req, res) {
  try {
    await sequelize.query(
      'UPDATE users SET token = null WHERE id = ' + res.locals.userId + ''
    )
    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      error: error.message,
    })
  }
}

export default {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
  login,
  logout,
}
