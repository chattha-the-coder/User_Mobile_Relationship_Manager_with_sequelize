const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("tokend", "root", "root", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.contact = require("./contact")(sequelize, DataTypes);
db.user = require("./user")(sequelize, DataTypes);
db.mobile = require("./mobile")(sequelize, DataTypes);

db.user.hasOne(db.contact, { foreignKey: "userId", onDelete: "CASCADE" });
db.contact.belongsTo(db.user, { foreignKey: "userId" });

db.user.belongsToMany(db.mobile, {
  through: "UserMobiles",
  foreignKey: "userId",
});
db.mobile.belongsToMany(db.user, {
  through: "UserMobiles",
  foreignKey: "mobileId",
});

db.sequelize.sync().then(() => {
  console.log("All tables and relationships have been created successfully!");
});

module.exports = db;
