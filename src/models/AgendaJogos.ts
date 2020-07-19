import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'

class AgendaJogos extends Model {
}

AgendaJogos.init({
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    set (value:string) {
      this.setDataValue('data', new Date(value))
    },
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }
  },
  adversario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }
  },
  votou: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }
  },
  confirmado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }
  }
}, {
  sequelize,
  modelName: 'agenda_jogos'
})

AgendaJogos.belongsTo(AgendaJogos, { foreignKey: 'equipe_id', targetKey: 'id', as: 'equipe' })

export default AgendaJogos
