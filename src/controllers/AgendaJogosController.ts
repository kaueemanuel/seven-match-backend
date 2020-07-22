// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import Equipe from 'src/models/Equipe'
import AgendaJogos from 'src/models/AgendaJogos'
import { Op } from 'sequelize'

class AgendaJogosController {
  async criar (req:Request, res:Response) {
    try {
    // eslint-disable-next-line camelcase
      const { equipe_id } = req.params
      // eslint-disable-next-line camelcase
      const { data, local, adversario_id, confirmado } = req.body

      const equipe = await Equipe.findByPk(equipe_id)
      const adversario = await Equipe.findByPk(adversario_id)
      if (!equipe) return res.status(400).json({ error: 'Equipe não encontrada' })
      if (!adversario) return res.status(400).json({ error: 'Equipe adversária não encontrada' })

      const agenda = await AgendaJogos.create({ votou: 0, data, local, adversario_id, confirmado, equipe_id })
      res.status(200).json(agenda)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async listar (req:Request, res:Response) {
    try {
    // eslint-disable-next-line camelcase
      const { equipe_id } = req.params

      const equipe = await Equipe.findByPk(equipe_id)
      if (!equipe) {
        const errors = [{ message: 'Equipe não encontrada' }]
        return res.status(400).json(errors)
      }
      // eslint-disable-next-line camelcase
      const agenda_jogos = await AgendaJogos.findAll({
        where: {
          [Op.or]: [
            { equipe_id: equipe_id },
            { adversario_id: equipe_id }
          ]
        }
      })

      res.status(200).json(agenda_jogos)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async deletar (req:Request, res:Response) {
    try {
    // eslint-disable-next-line camelcase
      const { equipe_id } = req.params

      const equipe = await Equipe.findByPk(equipe_id)
      if (!equipe) {
        const errors = [{ message: 'Equipe não encontrada' }]
        return res.status(400).json(errors)
      }

      // eslint-disable-next-line camelcase
      const agenda_jogos = await AgendaJogos.findAll({
        where: {
          [Op.or]: [
            { equipe_id: equipe_id },
            { adversario_id: equipe_id }
          ]
        }
      })

      res.status(200).json(agenda_jogos)
    } catch (error) {
      const errors = [{ message: error }]
      return res.status(400).json(errors)
    }
  }
}

export default new AgendaJogosController()
