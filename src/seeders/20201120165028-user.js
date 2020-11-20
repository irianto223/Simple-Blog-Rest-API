'use strict';
// const { Role } = require('../models');
// const { ROLES } = require('../shared/constant');
// const { hashPassword } = require('../helpers/auth');
// require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // const systemAdminRole = await Role.findOne({ where: { name: ROLES.SystemAdmin } });
    await queryInterface.bulkInsert('Users', [{
      fullName: 'Om Admin',
      email: 'admin@mailinator.com',
      password: bcrypt.hashSync('secret', bcrypt.genSaltSync(10)),
      gender: 'laki-laki',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // get info user
    const users = await queryInterface.sequelize.query(
      `SELECT * from "Users" WHERE "email" = 'admin@mailinator.com';`
    );
    const firstUser = users[0][0];

    // get info role
    const roles = await queryInterface.sequelize.query(
      `SELECT * from "Roles" WHERE "name" = 'SystemAdmin';`
    );
    const firstRole = roles[0][0];

    // get info access ArticleStore
    const articleStoreAccesses = await queryInterface.sequelize.query(
      `SELECT * from "Accesses" WHERE "name" = 'ArticleStore';`
    );
    const articleStore = articleStoreAccesses[0][0];

    // get info access ArticleAdminUpdate
    const articleAdminUpdateAccesses = await queryInterface.sequelize.query(
      `SELECT * from "Accesses" WHERE "name" = 'ArticleAdminUpdate';`
    );
    const articleAdminUpdate = articleAdminUpdateAccesses[0][0];

    await queryInterface.bulkInsert('UserRoles', [{
      userId: firstUser.id,
      roleId: firstRole.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('UserAccesses', [{
      userId: firstUser.id,
      accessId: articleStore.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: firstUser.id,
      accessId: articleAdminUpdate.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
