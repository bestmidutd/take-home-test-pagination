var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) =>{
    res.send('123')
})

module.exports = router