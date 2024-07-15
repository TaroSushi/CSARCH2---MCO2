const Handlebars = require('handlebars');
const express = require("express");
const mainRouter = express.Router();

mainRouter.get('/', function(req, resp){

    resp.render('canvas',{
        layout: 'index',
        title: 'title',
    });//resp render

});//router get

mainRouter.get('/game', function(req, resp){

    resp.render('canvas',{
        layout: 'game',
        title: 'title',
    });//resp render

});//router get

const headerRouter = require('./headerRouter');
mainRouter.use('/', headerRouter);

module.exports = mainRouter