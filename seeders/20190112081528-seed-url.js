"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Urls",
      [
        {
          destination:
            "https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/",
          short: "xerTy34",
          status: "ACTIVE",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          userId: 1
        },
        {
          destination:
            "http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps",
          short: "ymrTO34",
          status: "INACTIVE",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          userId: 1
        },
        {
          destination:
            "https://www.google.com/search?hl=en&q=sequelize%20date%20seeders",
          short: "ynrT134",
          status: "ACTIVE",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          userId: 1
        },
        {
          destination:
            "http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps",
          short: "oooIk80",
          status: "ACTIVE",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          userId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Urls", null, {});
  }
};
