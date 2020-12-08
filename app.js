var express = require('express')
var path = require('path');
var app = express()
var http = require('http')
var indexRouter = require('./routes/index')
var paginationRouter = require('./routes/pagination')
var app = express();
var server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/users', paginationRouter)
server.listen('3000')