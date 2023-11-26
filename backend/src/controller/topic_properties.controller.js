import topicPropertiesService from '../service/topic_properties.service.js'

const listar = async function (req, res) {
  try {
    const topicProperties = await topicPropertiesService.listar(
      req.params.filtro || ''
    )
    if (topicProperties) {
      res.json({
        success: true,
        topicProperties,
      })
    } else {
      res.json({
        success: true,
        topicProperties: [],
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
    const topic_properties = await topicPropertiesService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (themesPropertiesModelResult) {
      res.json({
        success: true,
        topic_properties,
      })
    } else {
      res.json({
        success: true,
        topic_properties: [],
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
    const topic_properties =
      await topicPropertiesService.consultarPorCodigoTheme(
        req.params.filtro || ''
      )
    if (themesPropertiesModelResult) {
      res.json({
        success: true,
        topic_properties,
      })
    } else {
      res.json({
        success: true,
        topic_properties: [],
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
    themesPropertiesReturn = await topicPropertiesService.actualizar(
      req.body.id,
      req.body.topic_id,
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
    await topicPropertiesService.eliminar(req.params.filtro || '')
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
