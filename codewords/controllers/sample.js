const express = require('express')
const api = express.Router()
const Model = require('../models/sample.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'sample'

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('index.ejs')
})
module.exports = api