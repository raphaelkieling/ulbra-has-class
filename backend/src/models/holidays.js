'use strict';
module.exports = (sequelize, DataTypes) => {
  var holidays = sequelize.define('holidays', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    dateHoliday: {
      type: DataTypes.DATE,
      require: true
    },
    description:{
      type: DataTypes.STRING,
      require: true
    },
    active: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  holidays.associate = function (models) {
    // associations can be defined here
  };
  return holidays;
};