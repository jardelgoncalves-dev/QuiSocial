export default (sequelize, DataType) => {
  const Posts = sequelize.define('Posts', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataType.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, 
  {
    underscored: true,
    classmethod:{
      associate: function(models){
        Posts.belongsTo(models.Users, {foreignKey: 'userId', targetKey: 'id'})
        Posts.hasMany(models.Likes, {foreignKey: 'postId'})
      }
    }
  })
  return Posts
}