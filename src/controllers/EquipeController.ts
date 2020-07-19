// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Equipe from 'src/models/Equipe'

class EquipeController {
  async criar (req:Request, res:Response) {
    try {
      const { nome, email, senha, arena } = req.body

      //   const senhaHash = Equipe.criptografarSenha(senha)
      const equipe = await Equipe.create({ nome, email, senha: senha, salt: senha, arena })
      return res.status(200).json(equipe)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async listar (req:Request, res:Response) {
    try {
      const equipes = await Equipe.findAll()
      return res.status(200).json(equipes)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async listarEquipe (req:Request, res:Response) {
    try {
      const { id } = req.params
      const equipe = await Equipe.findByPk(id)
      return res.status(200).json(equipe)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async deletarEquipe (req:Request, res:Response) {
    try {
      const { id } = req.params
      // eslint-disable-next-line no-unused-vars
      const equipe = await Equipe.destroy({ where: { id } })
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

export default new EquipeController()
