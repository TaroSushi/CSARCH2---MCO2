const Handlebars = require('handlebars');
const express = require("express");
const mainRouter = express.Router();

mainRouter.get('/', async function(req, resp){

    resp.render('title',{
        layout: 'menu',
        title: 'AnimoCache',
    });//resp render

});//router get

mainRouter.get('/game', async function(req, resp){

    resp.render('canvas',{
        layout: 'game',
        title: 'Preparing Cache...',
    });//resp render

});//router get

const headerRouter = require('./headerRouter');
mainRouter.use('/', headerRouter);

module.exports = mainRouter