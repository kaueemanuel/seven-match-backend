'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agenda_jogos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      local: {
        type: Sequelize.STRING,
        allowNull: false
      },
      confirmado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      equipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'equipes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      adversario_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      votou: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('agenda_jogos')
  }
}
