const Handlebars = require('handlebars');
const express = require("express");
const mainRouter = express.Router();

let message;

mainRouter.get('/', async function(req, resp){

    resp.render('title',{
        layout: 'menu',
        title: 'AnimoCache',
    });//resp render

});//router get

mainRouter.post('/start', async function(req, resp){

    resp.send({
        terminal : 0
    });//resp send
});//router get

mainRouter.get('/game', async function(req, resp){

    resp.render('canvas',{
        layout: 'game',
        title: 'Direct Mapping...',
    });//resp render

});//router get

const headerRouter = require('./headerRouter');
mainRouter.use('/', headerRouter);

module.exports = mainRouter