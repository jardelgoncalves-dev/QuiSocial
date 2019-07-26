export default (sequelize, DataType) => {
  const Likes = sequelize.define('Likes', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, 
  {
    underscored: true,
    classmethod:{
      associate: function(models){
        Likes.belongsTo(models.Users, {foreignKey: 'userId', targetKey: 'id'})
        Likes.belongsTo(models.Posts, {foreignKey: 'postId', targetKey: 'id'})
      }
    }
  })

  return Likes
}