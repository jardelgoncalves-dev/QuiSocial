import bcrypt from 'bcryptjs'

export default (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    photoName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    bio: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  })

  Users.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return Users
}