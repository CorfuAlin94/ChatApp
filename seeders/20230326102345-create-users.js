"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash("1234", 10);
    const createdAt = new Date();
    const updatedAt = createdAt;

    await queryInterface.bulkInsert("users", [
      {
        username: "Mircea",
        email: "mircea@email.com",
        password: password,
        image:
          "https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        createdAt,
        updatedAt,
      },
      {
        username: "Maria",
        email: "Maria@email.com",
        password: password,
        image:
          "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        createdAt,
        updatedAt,
      },
      {
        username: "Ed",
        email: "ed@email.com",
        password: password,
        image:
          "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        createdAt,
        updatedAt,
      },
      {
        username: "Sarah",
        email: "sarah@email.com",
        password: password,
        image:
          "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        createdAt,
        updatedAt,
      },
      {
        username: "Andrei",
        email: "andrei@email.com",
        password: password,
        image:
          "https://images.unsplash.com/photo-1634034379073-f689b460a3fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        createdAt,
        updatedAt,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
