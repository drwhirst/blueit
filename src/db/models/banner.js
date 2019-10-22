'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    description: DataTypes.STRING,
    source: DataTypes.STRING
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};