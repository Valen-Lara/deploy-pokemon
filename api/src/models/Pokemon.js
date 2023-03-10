const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  //esto me genera autamaticamente un id UUIDV4 
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    types: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  },
  {
    timestamps: false,
    //  createdAt: false, // don't add createdAt attribute
    //  updatedAt: false,
  },
  );
};
