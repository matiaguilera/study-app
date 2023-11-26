import commentController from '../controller/comments.controller.js'
import authMiddleware from '../middleware/auth.controller.js'

export default function (app) {
  app.get(
    '/comments/list/:filtro',
    authMiddleware.auth,
    commentController.listar
  )
  app.delete(
    '/comments/delete/:filtro',
    authMiddleware.auth,
    commentController.eliminar
  )
  app.post(
    '/comments/update',
    authMiddleware.auth,
    commentController.actualizar
  )
}
