import userController from '../controller/users.controller.js'
import authMiddleware from '../middleware/auth.controller.js'

export default function (app) {
  app.get('/users/list', authMiddleware.auth, userController.listar)
  app.get('/users/buscarPorCodigo/:filtro', userController.busquedaPorCodigo)
  app.get('/users/buscarPorEmail/:filtro', userController.busquedaPorEmail)
  app.post('/users/update', userController.actualizar)
  app.delete(
    '/users/delete/:filtro',
    authMiddleware.auth,
    userController.eliminar
  )
  app.post('/user/login', userController.login)
  app.post('/user/logout', authMiddleware.auth, userController.logout)
}
