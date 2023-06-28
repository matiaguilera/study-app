import subjectsController from '../controller/subjects.controller.js'
import authMiddleware from '../middleware/auth.controller.js'

export default function (app) {
  app.get('/subjects/list', authMiddleware.auth, subjectsController.listar)
  app.get(
    '/subjects/buscarPorCodigo/:filtro',
    authMiddleware.auth,
    subjectsController.busquedaPorCodigo
  )
  app.post(
    '/subjects/update',
    authMiddleware.auth,
    subjectsController.actualizar
  )
  app.delete(
    '/subjects/delete/:filtro',
    authMiddleware.auth,
    subjectsController.eliminar
  )
}
