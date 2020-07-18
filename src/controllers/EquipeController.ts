// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Equipe from 'src/models/Equipe'

class EquipeController {
  async criar (req:Request, res:Response) {
    const { nome, email, senha, arena } = req.body

    const senhaHash = Equipe.criptografarSenha(senha)
    const equipe = await Equipe.create({ nome, email, senha: senhaHash.hash, salt: senhaHash.salt, arena })
    return res.status(200).json(equipe)
  }

  async listar (req:Request, res:Response) {
    const equipes = await Equipe.findAll()
    return res.status(200).json(equipes)
  }

  async listarEquipe (req:Request, res:Response) {
    const { id } = req.params
    const equipe = await Equipe.findByPk(id)
    return res.status(200).json(equipe)
  }

  async deletarEquipe (req:Request, res:Response) {
    const { id } = req.params
    // eslint-disable-next-line no-unused-vars
    const equipe = await Equipe.destroy({ where: { id } })
    return res.status(200).json({})
  }
}

export default new EquipeController()
