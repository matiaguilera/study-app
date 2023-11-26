import sequelize from '../connection.js'
import TopicItemsModel from '../model/topic_items.model.js'

const listar = async function (id) {
  try {
    const topicItems = await sequelize.query(`SELECT * 
      FROM topic_items WHERE topic_id = ${id}`)
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

const consultarPorCodigo = async function (codigo) {
  try {
    const topicItemsModelResult = await TopicItemsModel.findByPk(codigo)
    if (topicItemsModelResult) {
      return topicItemsModelResult
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
  topic_id
) {
  let topicItemsReturn = null
  const data = { id, create_date, name, description, topic_id }
  try {
    let topicItemsExist = null
    if (id) {
      topicItemsExist = await TopicItemsModel.findByPk(id)
    }
    if (topicItemsExist) {
      topicItemsReturn = await TopicItemsModel.update(data, {
        where: { id: id },
      })
      topicItemsReturn = data
    } else {
      topicItemsReturn = await TopicItemsModel.create(data)
    }
    return topicItemsReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    TopicItemsModel.destroy({ where: { id: codigo } }, { truncate: false })
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
