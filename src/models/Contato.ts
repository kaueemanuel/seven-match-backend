import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'

class Contato extends Model {
}

Contato.init({
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo deve ser preenchido'
      }
    }

  }
}, {
  sequelize,
  modelName: 'contato'
})

Contato.belongsTo(Contato, { foreignKey: 'equipe_id', targetKey: 'id', as: 'equipe' })

export default Contato
