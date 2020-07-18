// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Contato from 'src/models/Contato'
import Equipe from 'src/models/Equipe'

class ContatoController {
  async criar (req:Request, res:Response) {
    // eslint-disable-next-line camelcase
    const { equipe_id } = req.params
    const { telefone } = req.body

    const equipe = await Equipe.findByPk(equipe_id)
    if (!equipe) return res.status(400).json({ erro: 'Usuário não encontrado' })

    const contato = await Contato.create({ telefone, equipe_id })
    res.status(200).json(contato)
  }

  async listar (req:Request, res:Response) {
    // eslint-disable-next-line camelcase
    const { equipe_id } = req.params

    const equipe = await Equipe.findByPk(equipe_id, {
      include: { association: 'contatos' }
    })
    if (!equipe) return res.status(400).json({ erro: 'Usuário não encontrado' })

    res.status(200).json(equipe.contatos)
  }
}

export default new ContatoController()
