import sequelize from '../connection.js'
import TopicPropertiesModel from '../model/topic_properties.model.js'

const listar = async function (id) {
  try {
    const topic_properties = await sequelize.query(`SELECT * 
      FROM topic_properties
      WHERE topic_id = ${id}`)
    if (topic_properties && topic_properties[0]) {
      return topic_properties[0]
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
    const TopicPropertiesModelResult = await TopicPropertiesModel.findByPk(
      codigo
    )
    if (TopicPropertiesModelResult) {
      return TopicPropertiesModelResult
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const consultarPorCodigoTopic = async function (codigo) {
  try {
    const topic_properties = await sequelize.query(
      `SELECT * FROM topic_properties topic_id=${codigo} ORDER BY id`
    )
    if (topic_properties && topic_properties[0]) {
      return topic_properties[0]
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
  topic_id,
  property_name,
  property_value
) {
  let topicPropertiesReturn = null
  const data = { id, topic_id, property_name, property_value }
  try {
    let topicPropertiesExist = null
    if (id) {
      topicPropertiesExist = await TopicPropertiesModel.findByPk(id)
    }
    if (topicPropertiesExist) {
      topicPropertiesReturn = await TopicPropertiesModel.update(data, {
        where: { id: id },
      })
      topicPropertiesReturn = data
    } else {
      topicPropertiesReturn = await TopicPropertiesModel.create(data)
    }
    return topicPropertiesReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    TopicPropertiesModel.destroy({ where: { id: codigo } }, { truncate: false })
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
  consultarPorCodigoTopic,
}
