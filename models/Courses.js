'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    course_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    course_name: DataTypes.STRING
  }, {});
  Courses.associate = function(models) {
  };
  return Courses;
};