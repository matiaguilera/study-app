import sequelize from '../connection.js'
import CommentsModel from '../model/comments.model.js'

const listar = async function (textoBuscar) {
  try {
    console.log(textoBuscar)
    const comments = await sequelize.query(
      `SELECT c.id, u.name, u.last_name, c.create_date, c.content, c.owner_user_id FROM comments c JOIN users u ON owner_user_id = u.id WHERE theme_id = ${textoBuscar}`
    )

    if (comments && comments[0]) {
      return comments[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const actualizar = async function (
  create_date,
  content,
  owner_user_id,
  theme_id
) {
  const data = {
    create_date,
    content,
    owner_user_id,
    theme_id,
  }

  try {
    return await CommentsModel.create(data)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    CommentsModel.destroy({ where: { id: codigo } }, { truncate: false })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  listar,
  eliminar,
  actualizar,
}
