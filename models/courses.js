'use strict';
module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    course_id :  {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    course_name : {
      type : DataTypes.STRING
    }
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
  };
  return courses;
};