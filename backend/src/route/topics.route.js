import topicsController from '../controller/topics.controller.js'
import authMiddleware from '../middleware/auth.controller.js'

export default function (app) {
  app.get('/topics/list', authMiddleware.auth, topicsController.listar)
  app.get(
    '/topics/buscarPorCodigo/:filtro',
    authMiddleware.auth,
    topicsController.busquedaPorCodigo
  )
  app.post('/topics/update', authMiddleware.auth, topicsController.actualizar)
  app.delete(
    '/topics/delete/:filtro',
    authMiddleware.auth,
    topicsController.eliminar
  )
}
