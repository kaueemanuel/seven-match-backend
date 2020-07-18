import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/api', routes)
export default app
