import topicsService from '../service/topics.service.js'

const listar = async function (req, res) {
  try {
    const topics = await topicsService.listar()
    if (topics) {
      res.json({
        success: true,
        topicos: topics,
      })
    } else {
      res.json({
        success: true,
        topicos: [],
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      sucess: false,
      error: error.message,
    })
  }
}

const consultarPorCodigo = async function (req, res) {
  try {
    const topicsModelResult = await topicsService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (topicsModelResult) {
      res.json({
        success: true,
        topic: topicsModelResult,
      })
    } else {
      res.json({
        success: true,
        topic: [],
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
  let topicsReturn = null

  try {
    topicsReturn = await topicsService.actualizar(
      req.body.id,
      req.body.create_date,
      req.body.name,
      req.body.description,
      req.body.order,
      req.body.priority,
      req.body.owner_user_id
    )
    res.json({
      success: true,
      topic: topicsReturn,
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
    await topicsService.eliminar(req.params.filtro || '')
    res.json({
      success: true,
    })
  } catch (error) {
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
}
