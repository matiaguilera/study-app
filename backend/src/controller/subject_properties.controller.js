import subjectPropertiesService from '../service/subject_properties.service.js'

const listar = async function (req, res) {
  try {
    const subject_properties = await subjectPropertiesService.listar(
      req.query.filtro || ''
    )
    if (subject_properties) {
      res.json({
        success: true,
        subject_properties,
      })
    } else {
      res.json({
        success: true,
        subject_properties: [],
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
    const subject_properties = await subjectPropertiesService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (themesPropertiesModelResult) {
      res.json({
        success: true,
        subject_properties,
      })
    } else {
      res.json({
        success: true,
        subject_properties: [],
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

const consultarPorCodigoTheme = async function (req, res) {
  try {
    const subject_properties =
      await subjectPropertiesService.consultarPorCodigoTheme(
        req.params.filtro || ''
      )
    if (themesPropertiesModelResult) {
      res.json({
        success: true,
        subject_properties,
      })
    } else {
      res.json({
        success: true,
        subject_properties: [],
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
  let themesPropertiesReturn = null
  try {
    themesPropertiesReturn = await subjectPropertiesService.actualizar(
      req.body.id,
      req.body.theme_id,
      req.body.property_name,
      req.body.property_value
    )
    res.json({
      success: true,
      themes_properties: themesPropertiesReturn,
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
    await subjectPropertiesService.eliminar(req.params.filtro || '')
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
  consultarPorCodigoTheme,
}
