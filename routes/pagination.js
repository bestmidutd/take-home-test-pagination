var express = require('express')
var router = express.Router()
var pagination = require('../service/pagination')
router.get('/', pagination.renderForm)

module.exports = router