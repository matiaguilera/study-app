import userRoute from './src/route/users.route.js'
import topicsRoute from './src/route/topics.route.js'
import topicItemsRoute from './src/route/topic_items.route.js'
import topicPropertiesRoute from './src/route/topic_properties.route.js'
import commentsRoute from './src/route/comments.route.js'
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
topicsRoute(app)
topicItemsRoute(app)
topicPropertiesRoute(app)
commentsRoute(app)

app.listen(3000)
