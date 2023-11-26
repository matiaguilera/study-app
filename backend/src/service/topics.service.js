import sequelize from '../connection.js'
import TopicsModel from '../model/topics.model.js'

const listar = async function () {
  try {
    const topicItems = await sequelize.query(`SELECT 
      t.id AS id, 
      t.create_date, 
      t.name, t.description, 
      u.name AS user_name, u.last_name,
      u.email,
      t.order,
      t.priority
      FROM topics t JOIN users u ON t.owner_user_id = u.id
      ORDER BY t.id`)
    if (topicItems && topicItems[0]) {
      return topicItems[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const busquedaPorCodigo = async function (codigo) {
  try {
    const TopicModelResult = await sequelize.query(`SELECT 
    t.id AS id, 
    t.create_date, 
    t.name, t.description, t.priority, t.order,
    u.name AS user_name, u.last_name,
    u.email,
    t.order,
    t.priority
    FROM topics t JOIN users u ON t.owner_user_id = u.id WHERE t.id = ${codigo}
    ORDER BY t.id`)
    if (TopicModelResult) {
      return TopicModelResult[0][0]
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
  create_date,
  name,
  description,
  order,
  priority,
  owner_user_id
) {
  let topicsReturn = null
  const data = {
    id,
    create_date,
    name,
    description,
    order,
    priority,
    owner_user_id,
  }

  try {
    let topicsExist = null
    if (id) {
      topicsExist = await TopicsModel.findByPk(id)
    }
    if (topicsExist) {
      topicsReturn = await TopicsModel.update(data, { where: { id } })
      topicsReturn = data
    } else {
      topicsReturn = await TopicsModel.create(data)
    }
    return topicsReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    TopicsModel.destroy({ where: { id: codigo } }, { truncate: false })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  listar,
  busquedaPorCodigo,
  actualizar,
  eliminar,
}
