import Contato from 'src/models/Contato'
import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'
import crypto from 'crypto'
import AgendaJogos from './AgendaJogos'

class Equipe extends Model {
  [x: string]: any
  static gerarSalt () {
    return crypto.randomBytes(16)
      .toString('hex')
      .slice(0, 16)
  }

  static sha512 (senha:string, salt:string) {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(senha)
    var hashFinal = hash.digest('hex')
    return {
      salt,
      hash: hashFinal
    }
  }

  static criptografarSenha (senha:string) {
    if (!senha) {
      return {
        salt: null,
        hash: null
      }
    }
    var salt = Equipe.gerarSalt()
    var senhaESalt = Equipe.sha512(senha, salt)
    return senhaESalt
  }

  static verificaSenha (senhaDoLogin:string, saltNoBanco:string, hashNoBanco:string) {
    var senhaESalt = Equipe.sha512(senhaDoLogin, saltNoBanco)
    return hashNoBanco === senhaESalt.hash
  }
}

Equipe.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Campo deve ser preenchido' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'email',
      msg: 'Email já cadastrado'
    },
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      },
      isEmail: {
        msg: 'Campo deve ser um email'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    set (value:string) {
      const senha = Equipe.criptografarSenha(value)
      this.setDataValue('senha', senha.hash)
      this.setDataValue('salt', senha.salt)
    },
    validate: {
      notContains: {
        args: [' '],
        msg: 'Senha inválida'
      },
      notNull: { msg: 'Campo deve ser preenchido' }
    }
  },
  arena: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Campo deve ser preenchido' }
    }
  },
  salt: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'equipe'

})

Equipe.hasMany(Contato, { foreignKey: 'equipe_id', sourceKey: 'id', as: 'contatos' })
Equipe.hasMany(AgendaJogos, { foreignKey: 'equipe_id', sourceKey: 'id', as: 'agenda_jogos' })

export default Equipe
