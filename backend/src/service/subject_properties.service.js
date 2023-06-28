import sequelize from '../connection.js'
import SubjectPropertiesModel from '../model/subject_properties.model.js'

const listar = async function (textoBuscar) {
  try {
    const themes_properties = await sequelize.query(`SELECT * 
      FROM themes_properties
      WHERE 1=1
        AND UPPER(property_name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`)
    if (themes_properties && themes_properties[0]) {
      return themes_properties[0]
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
    const SubjectPropertiesModelResult = await SubjectPropertiesModel.findByPk(
      codigo
    )
    if (SubjectPropertiesModelResult) {
      return SubjectPropertiesModelResult
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const consultarPorCodigoTheme = async function (codigo) {
  console.log('consultar 1 propiedad de tema por codigo del tema')
  try {
    const themes_properties = await sequelize.query(`SELECT * 
                                                    FROM themes_properties
                                                    WHERE 1=1
                                                    AND theme_id=${codigo}
                                                    ORDER BY id`)
    if (themes_properties && themes_properties[0]) {
      return themes_properties[0]
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
  theme_id,
  property_name,
  property_value
) {
  let themesPropertiesReturn = null
  const data = { id, theme_id, property_name, property_value }
  try {
    let themesPropertiesExist = null
    if (id) {
      themesPropertiesExist = await SubjectPropertiesModel.findByPk(id)
    }
    if (themesPropertiesExist) {
      themesPropertiesReturn = await SubjectPropertiesModel.update(data, {
        where: { id: id },
      })
      themesPropertiesReturn = data
    } else {
      themesPropertiesReturn = await SubjectPropertiesModel.create(data)
    }
    return themesPropertiesReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const eliminar = async function (codigo) {
  try {
    SubjectPropertiesModel.destroy(
      { where: { id: codigo } },
      { truncate: false }
    )
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
  consultarPorCodigoTheme,
}
