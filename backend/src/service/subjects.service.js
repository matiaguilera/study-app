import sequelize from '../connection.js'
import SubjectsModel from '../model/subjects.model.js'

const listar = async function (textoBuscar) {
  try {
    const themes = await sequelize.query(`SELECT * 
      FROM themes
      WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`)
    if (themes && themes[0]) {
      return themes[0]
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
    const SubjectsModelResult = await SubjectsModel.findByPk(codigo)
    if (SubjectsModelResult) {
      return SubjectsModelResult
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
  keywords,
  owner_user_id
) {
  let subjectsReturn = null
  const data = { id, create_date, name, description, keywords, owner_user_id }
  try {
    let themesExist = null
    if (id) {
      themesExist = await SubjectsModel.findByPk(id)
    }
    if (themesExist) {
      subjectsReturn = await SubjectsModel.update(data, { where: { id: id } })
      subjectsReturn = data
    } else {
      subjectsReturn = await SubjectsModel.create(data)
    }
    return subjectsReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    SubjectsModel.destroy({ where: { id: codigo } }, { truncate: false })
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
