import userRoute from './src/route/users.route.js'
import subjectsRoute from './src/route/subjects.route.js'
import topicsRoute from './src/route/topics.route.js'
import subjectPropertiesRoute from './src/route/subject_properties.route.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser())

app.use(
  cors({
    origin: '*',
  })
)

userRoute(app)
subjectsRoute(app)
topicsRoute(app)
subjectPropertiesRoute(app)

app.listen(3000)
