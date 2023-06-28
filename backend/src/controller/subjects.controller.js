import subjectsService from '../service/subjects.service.js'

const listar = async function (req, res) {
  try {
    const subjects = await subjectsService.listar(req.query.filtro || '')
    if (subjects) {
      res.json({
        success: true,
        subjects,
      })
    } else {
      res.json({
        success: true,
        subjects: [],
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
    const subjectsModelResult = await subjectsService.busquedaPorCodigo(
      req.params.filtro || ''
    )
    if (subjectsModelResult) {
      res.json({
        success: true,
        subject: subjectsModelResult,
      })
    } else {
      res.json({
        success: true,
        subject: [],
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
  const { id, create_date, name, description, keywords, owner_user_id } =
    req.body

  try {
    await subjectsService.actualizar(
      id,
      create_date,
      name,
      description,
      keywords,
      owner_user_id
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
    await subjectsService.eliminar(req.params.filtro || '')
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
