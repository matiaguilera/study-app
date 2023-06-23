const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser())

app.use(
  cors({
    origin: '*',
  })
)

const userRoute = require('./src/route/users/users.route')
const themesRoute = require('./src/route/themes/themes.route')
const topicsRoute = require('./src/route/topics/topics.route')
const themes_propertiesRoute = require('./src/route/themes_properties/themes_properties.route')

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/pagina2', function (req, res) {
  res.json({ application: 'Study App', version: '1.0.0' })
})

userRoute(app)
themesRoute(app)
topicsRoute(app)
themes_propertiesRoute(app)

app.listen(3000)
