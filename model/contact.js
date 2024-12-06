module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
      "Contact",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        permanent_add: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        current_add: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users", 
            key: "id",
          },
        },
      },
      {
        tableName: "Contacts",
        timestamps: false,
      }
    );
  
    return Contact;
  };
  