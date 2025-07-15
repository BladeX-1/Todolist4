const DataTypes = require("sequelize/lib/data-types");
const { sequelize } = require("../config/dbconfig");

const Task = sequelize.define("Task", {
    body: { type: DataTypes.STRING, allowNull: false },
    done: { type: DataTypes.BOOLEAN, allowNull: false },
});
Task.sync({ force: false });
module.exports = Task;
