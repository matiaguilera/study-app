import CommentService from '../service/comment.service.js'

const listar = async function (req, res) {
  try {
    const comments = await CommentService.listar(req.params.filtro || '')
    if (comments) {
      res.json({
        success: true,
        comentarios: comments,
      })
    } else {
      res.json({
        success: true,
        comentarios: [],
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
  try {
    let comment = await CommentService.actualizar(
      req.body.create_date,
      req.body.content,
      req.body.owner_user_id,
      req.body.theme_id
    )
    res.json({
      success: true,
      comment,
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
    await CommentService.eliminar(req.params.filtro || '')
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
  eliminar,
  actualizar,
}
