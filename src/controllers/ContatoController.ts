// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Contato from 'src/models/Contato'
import Equipe from 'src/models/Equipe'

class ContatoController {
  async criar (req:Request, res:Response) {
    try {
    // eslint-disable-next-line camelcase
      const { equipe_id } = req.params
      const { telefone } = req.body

      const equipe = await Equipe.findByPk(equipe_id)

      if (!equipe) {
        const errors = [{ message: 'Equipe não encontrada' }]
        return res.status(400).json(errors)
      }

      const contato = await Contato.create({ telefone, equipe_id })
      res.status(200).json(contato)
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }

  async listar (req:Request, res:Response) {
    try {
    // eslint-disable-next-line camelcase
      const { equipe_id } = req.params

      const equipe = await Equipe.findByPk(equipe_id, {
        include: { association: 'contatos' }
      })

      if (!equipe) {
        const errors = [{ message: 'Equipe não encontrada' }]
        return res.status(400).json(errors)
      }

      res.status(200).json(equipe.contatos)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

export default new ContatoController()
