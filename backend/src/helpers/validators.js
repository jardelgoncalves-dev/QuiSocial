import validator from 'validator'

export default class Validators {
  constructor (data = {}, messages = {}) {
    this.errors = {}
    this._run(data, messages)
  }

  required (variable, key, message) {
    if (variable === undefined || variable === null || validator.isEmpty(variable)) {
      this._pushMessageErrorArray(key, message, 'This field is required!')
    }
  }

  email (variable, key, message) {
    if (variable === undefined || !validator.isEmail(variable)) {
      this._pushMessageErrorArray(key, message, 'Email invalid!')
    }
  }

  integer (variable, key, message) {
    if (variable === undefined || !validator.isInt(variable)) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  float (variable, key, message) {
    if (variable === undefined || !validator.isFloat(variable)) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  number (variable, key, message) {
    if (isNaN(variable)) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  boolean (variable, key, message) {
    if (variable === undefined || !validator.isBoolean(variable)) {
      this._pushMessageErrorArray(key, message, 'Invalid Boolean value. Enter or true or false for this field!')
    }
  }

  hasError () {
    return Object.keys(this.errors).length > 0
  }

  hasKeyError (key) {
    return Object.keys(this.errors[key]).length > 0
  }

  firstKeyError (key) {
    return this.errors[key][0]
  }

  lastKeyError (key) {
    const len = Object.keys(this.errors[key]).length
    return this.errors[key][len - 1]
  }

  _pushMessageErrorArray (key, message, defaultMessage) {
    const [nameKey] = this._explode('.', key)
    if (!Array.isArray(this.errors[nameKey])) {
      this.errors[nameKey] = []
    }
    this.errors[nameKey].push(message[key] || defaultMessage)
  }

  _getMessageCorrect (messages = {}, key) {
    try {
      return messages[key]
    } catch (error) {
      throw new Error('key not found!')
    }
  }

  _explode (separator = ' ', value) {
    return value.split(separator)
  }

  _run (datas = {}, messages = {}) {
    Object.keys(datas).map(key => {
      const [, method] = this._explode('.', key)
      this._getMessageCorrect(messages, key)
      this[method](datas[key], key, messages)
    })
  }
}