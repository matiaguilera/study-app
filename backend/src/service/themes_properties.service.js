const { sequelize } = require("../connection");
const { ThemesPropertiesModel } = require("../model/themes_properties.model");

const listar = async function (textoBuscar) {
  console.log("listar propiedades de temas");
  try {
    const themes_properties = await sequelize.query(`SELECT * 
      FROM themes_properties
      WHERE 1=1
        AND UPPER(property_name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`);
    if (themes_properties && themes_properties[0]) {
      return themes_properties[0];
    } else { 
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (codigo) {
  console.log("consultar 1 propiedad de tema por codigo");
  try {
    const themesPropertiesModelResult = await ThemesPropertiesModel.findByPk(
      codigo
    );
    if (themesPropertiesModelResult) {
      return themesPropertiesModelResult;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigoTheme = async function (codigo) {
  console.log("consultar 1 propiedad de tema por codigo del tema");
  try {
    const themes_properties = await sequelize.query(`SELECT * 
                                                    FROM themes_properties
                                                    WHERE 1=1
                                                    AND theme_id=${codigo}
                                                    ORDER BY id`);
    if (themes_properties && themes_properties[0]) {
      return themes_properties[0];
    } else {
      return [];
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (
  id,
  theme_id,
  property_name,
  property_value
) {
  console.log("actualizar propiedad de tema");
  let themesPropertiesReturn = null;
  const data = { id, theme_id, property_name, property_value };
  try {
    let themesPropertiesExist = null;
    if (id) {
      themesPropertiesExist = await ThemesPropertiesModel.findByPk(id);
    }
    if (themesPropertiesExist) {
      themesPropertiesReturn = await ThemesPropertiesModel.update(data, {
        where: { id: id },
      });
      themesPropertiesReturn = data;
    } else {
      themesPropertiesReturn = await ThemesPropertiesModel.create(data);
    }
    return themesPropertiesReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (codigo) {
  console.log("eliminar propiedad de tema");
  try {
    ThemesPropertiesModel.destroy(
      { where: { id: codigo } },
      { truncate: false }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
  consultarPorCodigoTheme,
};
