import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
