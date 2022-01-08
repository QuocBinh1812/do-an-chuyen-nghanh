"use strict";

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
    await queryInterface.bulkInsert(
      "datves",
      [
        {
          soluong: 1,
          tenphim: "What if",
          giochieu: "8:30",
          ngaychieu: "15/1/2021",
          rapchieu: 2,
          userId: 1,
          createdAt: "2021-06-10 21:30:35",
          updatedAt: "2021-06-10 21:30:35",
        },
        {
          soluong: 1,
          tenphim: "Doctor change 3",
          giochieu: "7:30",
          ngaychieu: "14/1/2021",
          rapchieu: 3,
          userId: 1,
          createdAt: "2021-06-10 21:30:35",
          updatedAt: "2021-06-10 21:30:35",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("datves", null, {});
  },
};
