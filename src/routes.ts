import EquipeController from './controllers/EquipeController'
import express from 'express'
import ContatoController from './controllers/ContatoController'
import AgendaJogosController from './controllers/AgendaJogosController'
import Jwt from './middlewares/auth'

const routes = express.Router()

// Equipe
const equipe = express.Router()
equipe.post('/login', EquipeController.login)
equipe.post('/', EquipeController.criar)

equipe.use(Jwt.verificarJwt)

equipe.get('/', EquipeController.listar)
equipe.get('/:id', EquipeController.listarEquipe)
equipe.delete('/:id', EquipeController.deletarEquipe)
equipe.post('/:equipe_id/contatos', ContatoController.criar)
equipe.get('/:equipe_id/contatos', ContatoController.listar)
equipe.post('/:equipe_id/agenda', AgendaJogosController.criar)
equipe.get('/:equipe_id/agenda', AgendaJogosController.listar)

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/equipes', equipe)

export default routes
