import topicItemsController from '../controller/topic_items.controller.js'
import authMiddleware from '../middleware/auth.controller.js'

export default function (app) {
  app.get(
    '/topic_items/list/:filtro',
    authMiddleware.auth,
    topicItemsController.listar
  )
  app.get(
    '/topic_items/buscarPorCodigo/:filtro',
    authMiddleware.auth,
    topicItemsController.busquedaPorCodigo
  )
  app.post(
    '/topic_items/update',
    authMiddleware.auth,
    topicItemsController.actualizar
  )
  app.delete(
    '/topic_items/delete/:filtro',
    authMiddleware.auth,
    topicItemsController.eliminar
  )
}
