// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Equipe from 'src/models/Equipe'
import Jwt from 'src/middlewares/auth'

class EquipeController {
  async criar (req:Request, res:Response) {
    try {
      const { nome, email, senha, arena } = req.body

      //   const senhaHash = Equipe.criptografarSenha(senha)
      const equipe = await Equipe.create({ nome, email, senha: senha, arena })
      return res.status(200).json(equipe)
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }

  async listar (req:Request, res:Response) {
    try {
      const equipes = await Equipe.findAll({ attributes: { exclude: ['senha', 'salt'] } })
      return res.status(200).json(equipes)
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }

  async listarEquipe (req:Request, res:Response) {
    try {
      const { id } = req.params
      const equipe = await Equipe.findByPk(id, { attributes: { exclude: ['senha', 'salt'] } })
      return res.status(200).json(equipe)
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }

  async deletarEquipe (req:Request, res:Response) {
    try {
      const { id } = req.params
      // eslint-disable-next-line no-unused-vars
      const equipe = await Equipe.destroy({ where: { id } })
      return res.status(200).json({})
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }

  async login (req:Request, res:Response) {
    try {
      const { email, senha } = req.body

      const equipe = await Equipe.findOne({ where: { email } })
      if (!equipe) {
        const errors = [{ message: 'Email inválido' }]
        return res.status(400).json(errors)
      }

      if (Equipe.verificaSenha(senha, equipe.salt, equipe.senha)) {
        const e = JSON.parse(JSON.stringify(equipe))
        delete e.id
        delete e.senha
        delete e.salt
        delete e.createdAt
        delete e.updatedAt
        e.token = Jwt.criarJwt(equipe.id)
        return res.status(200).json(e)
      } else {
        const errors = [{ message: 'Senha inválida' }]
        return res.status(400).json(errors)
      }
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }
}

export default new EquipeController()
