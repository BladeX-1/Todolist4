const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig");

const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
User.sync({ force: false });
module.exports = User;
