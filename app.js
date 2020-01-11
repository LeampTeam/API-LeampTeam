'use strict'

var express=require('express')
var bodyParser = require('body-parser')

var app = express();
var path = require('path');

var home_routes=require('./route/home')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/',home_routes)

module.exports=app;



