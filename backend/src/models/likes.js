export default (sequelize, DataType) => {
  const Likes = sequelize.define('Likes', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataType.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    postId: {
      type: DataType.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      },
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })
  
  return Likes
}