'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoleAccesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Roles',
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      accessId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Accesses',
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoleAccesses');
  }
};