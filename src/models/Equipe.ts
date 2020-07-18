import Contato from 'src/models/Contato'
import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'
import crypto from 'crypto'

class Equipe extends Model {
  [x: string]: any
  static gerarSalt () {
    return crypto.randomBytes(16)
      .toString('hex')
      .slice(0, 16)
  }

  static sha512 (senha:string, salt:string) {
    var hash = crypto.createHmac('sha512', salt) // Algoritmo de cripto sha512
    hash.update(senha)
    var hashFinal = hash.digest('hex')
    return {
      salt,
      hash: hashFinal
    }
  }

  static criptografarSenha (senha:string) {
    var salt = Equipe.gerarSalt() // Vamos gerar o salt
    var senhaESalt = Equipe.sha512(senha, salt) // Pegamos a senha e o salt
    return senhaESalt
  }

  static verificaSenha (senhaDoLogin:string, saltNoBanco:string, hashNoBanco:string) {
    var senhaESalt = Equipe.sha512(senhaDoLogin, saltNoBanco)
    return hashNoBanco === senhaESalt.hash
  }
}

Equipe.init({
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  arena: DataTypes.STRING,
  salt: DataTypes.STRING
}, {
  sequelize,
  modelName: 'equipe'
})

Equipe.hasMany(Contato, { foreignKey: 'equipe_id', sourceKey: 'id', as: 'contatos' })

export default Equipe
