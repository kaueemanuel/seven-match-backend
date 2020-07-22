/* eslint-disable no-unused-vars */
import jwtToken from 'jsonwebtoken'
import { Request, Response } from 'express'
import { rawListeners } from 'process'
import Equipe from 'src/models/Equipe'

class Jwt {
  static criarJwt (id:string | number) {
    return jwtToken.sign({ id: id + '' }, process.env.SECRET)
  }

  static verificarJwt (req:any, res:Response, next:any) {
    const autorizacao = req.headers.authorization
    if (!autorizacao) {
      const errors = [{ message: 'Use um token de identificação' }]
      return res.status(401).json(errors)
    }
    const token = autorizacao.split(' ')
    if (token.length !== 2) {
      const errors = [{ message: 'Token Inválido' }]
      return res.status(401).json(errors)
    }

    jwtToken.verify(token[1], process.env.SECRET, function (err:any, decoded:any) {
      if (err) {
        const errors = [{ message: err.message }]
        return res.json(errors)
      }
      req.equipe = Equipe.findByPk(decoded.id)
      next()
    })
  }
}

export default Jwt
