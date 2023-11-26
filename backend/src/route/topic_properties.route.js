import topicPropertiesController from '../controller/topic_properties.controller.js'

export default function (app) {
  app.get('/topic_properties/list/:filtro', topicPropertiesController.listar)
  app.get(
    '/topic_properties/buscarPorCodigo/:filtro',
    topicPropertiesController.busquedaPorCodigo
  )
  app.get(
    '/topic_properties/buscarPorTema/:filtro',
    topicPropertiesController.consultarPorCodigoTheme
  )
  app.post('/topic_properties/update', topicPropertiesController.actualizar)
  app.delete(
    '/topic_properties/delete/:filtro',
    topicPropertiesController.eliminar
  )
}
