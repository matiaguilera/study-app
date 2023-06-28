import subjectPropertiesController from '../controller/subject_properties.controller.js'

export default function (app) {
  app.get('/subject_properties/list', subjectPropertiesController.listar)
  app.get(
    '/subject_properties/buscarPorCodigo/:filtro',
    subjectPropertiesController.busquedaPorCodigo
  )
  app.get(
    '/subject_properties/buscarPorTema/:filtro',
    subjectPropertiesController.consultarPorCodigoTheme
  )
  app.post('/subject_properties/update', subjectPropertiesController.actualizar)
  app.delete(
    '/subject_properties/delete/:filtro',
    subjectPropertiesController.eliminar
  )
}
