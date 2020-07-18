import { Request, Response } from 'express'
import Equipe from 'src/models/Equipe'

class EquipeController {
  async criar (req:Request, res:Response) {
    const { nome, email, senha, telefone, arena } = req.body

    const senhaHash = Equipe.criptografarSenha(senha)
    const equipe = await Equipe.create({ nome, email, senha: senhaHash.hash, salt: senhaHash.salt, telefone, arena })
    return res.json(equipe)
  }
}

export default new EquipeController()
