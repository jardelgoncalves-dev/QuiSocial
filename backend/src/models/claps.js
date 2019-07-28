export default (sequelize, DataType) => {
  const Claps = sequelize.define('Claps', {
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
        Claps.belongsTo(models.Users, {foreignKey: 'userId', targetKey: 'id'})
        Claps.belongsTo(models.Posts, {foreignKey: 'postId', targetKey: 'id'})
      }
    }
  })

  return Claps
}