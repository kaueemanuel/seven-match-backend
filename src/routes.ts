import EquipeController from './controllers/EquipeController'
import express from 'express'
import ContatoController from './controllers/ContatoController'

const routes = express.Router()

// Equipe
const equipe = express.Router()
equipe.post('/', EquipeController.criar)
equipe.get('/', EquipeController.listar)
equipe.get('/:id', EquipeController.listarEquipe)
equipe.delete('/:id', EquipeController.deletarEquipe)
equipe.post('/:equipe_id/contatos', ContatoController.criar)
equipe.get('/:equipe_id/contatos', ContatoController.listar)

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/equipes', equipe)

export default routes
