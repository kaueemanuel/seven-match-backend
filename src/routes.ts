import EquipeController from './controllers/EquipeController'
import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})
routes.post('/equipe', EquipeController.criar)

export default routes
