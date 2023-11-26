import topicItemsService from '../service/topic_items.service.js'

const listar = async function (req, res) {
  try {
    const topicItems = await topicItemsService.listar(req.params.filtro || '')
    if (!topicItems) {
      topicItems = []
    }
    res.json({
      success: true,
      topicItems,
    })
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
    const topicItemsModelResult = await topicItemsService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (topicItemsModelResult) {
      res.json({
        success: true,
        topicItem: topicItemsModelResult,
      })
    } else {
      res.json({
        success: true,
        topicItem: [],
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
  const { id, create_date, name, description, topic_id } = req.body

  try {
    await topicItemsService.actualizar(
      id,
      create_date,
      name,
      description,
      topic_id
    )
    res.json({
      success: true,
      theme: null,
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
    await topicItemsService.eliminar(req.params.filtro || '')
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
}
