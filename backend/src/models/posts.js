export default (sequelize, DataType) => {
  const Posts = sequelize.define('Posts', {
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
    content: {
      type: DataType.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })
  return Posts
}