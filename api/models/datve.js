"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User);
    }
  }
  datve.init(
    {
      soluong: DataTypes.INTEGER,
      tenphim: DataTypes.STRING,
      giochieu: DataTypes.STRING,
      ngaychieu: DataTypes.STRING,
      rapchieu: DataTypes.INTEGER,
      giave: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "datve",
    }
  );
  return datve;
};
