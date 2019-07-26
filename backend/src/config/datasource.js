import Sequelize from 'sequelize'
import path from 'path'
import fs from 'fs'
import config from './config'

let database = null

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '..', 'models')
  let models = []
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    models[model.name] = model
  })

  return models
}

export default (app) => {
  if (!database) {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )

    database = {
      sequelize,
      Sequelize,
      models: {}
    }

    database.models = loadModels(sequelize)

    Object.keys(database.models).forEach(function(modelName) {
        const options = database.models[modelName].options
      if (options.classmethod !== undefined) {
        if (options.classmethod.hasOwnProperty('associate')){
          options.classmethod.associate(database.models)
        }
      }
    })

    sequelize.sync().done(() => database)
  }
  return database
}