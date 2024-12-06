module.exports = (sequelize, DataTypes) => {
    const Mobile = sequelize.define(
      "Mobile",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        mobileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "Mobiles",
        timestamps: false,
      }
    );
  
    return Mobile;
  };
  