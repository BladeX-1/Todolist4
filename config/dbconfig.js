const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = { sequelize };
