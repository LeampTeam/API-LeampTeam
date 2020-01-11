'use strict'

var express=require('express')
var api=express.Router();
var Home=require('../controller/home')

api.get('/',Home.home)

module.exports=api