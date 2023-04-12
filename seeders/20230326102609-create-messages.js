"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("messages", [
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3598",
        content: "Hey Maria!",
        from: "Mircea",
        to: "Maria",
        createdAt: "2023-03-21 07:00:00",
        updatedAt: "2023-03-21 07:00:00",
      },
      {
        uuid: "ae4df4f1-a428-400d-bb16-edd4237e0c47",
        content: "Hey Mircea, what is up??",
        from: "Maria",
        to: "Mircea",
        createdAt: "2023-03-21 08:00:00",
        updatedAt: "2023-03-21 08:00:00",
      },
      {
        uuid: "0a7c92ac-f69c-4799-8aad-9663a4afb47d",
        content: "Good, good, just chilling?",
        from: "Mircea",
        to: "Maria",
        createdAt: "2023-03-21 09:00:00",
        updatedAt: "2023-03-21 09:00:00",
      },
      {
        uuid: "240dd560-5825-4d5d-b089-12a67e8ec84c",
        content: "I'm working...",
        from: "Maria",
        to: "Mircea",
        createdAt: "2023-03-21 10:00:00",
        updatedAt: "2023-03-21 10:00:00",
      },
      {
        uuid: "fd4cee68-5caf-4b1b-80a9-5b9add7fd863",
        content: "Hey Mircea!",
        from: "Ed",
        to: "Mircea",
        createdAt: "2023-03-21 11:00:00",
        updatedAt: "2023-03-21 11:00:00",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("messages", null, {});
  },
};
