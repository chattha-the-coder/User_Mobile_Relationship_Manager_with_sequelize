
module.exports = (sequelize, DataTypes) => {
    const UserMobiles = sequelize.define(
      "UserMobiles",
      {
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Users",   
            key: "id",        
          },
          allowNull: false,
        },
        mobileId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Mobile",
            key: "id",      
          },
          allowNull: false,
        },
      },
      {
        tableName: "UserMobiles", 
        timestamps: false,        
      }
    );
  
    return UserMobiles;
  };
  