const Handlebars = require('handlebars');
const express = require("express");
const mainRouter = express.Router();


mainRouter.get('/', async function(req, resp){

    resp.render('title',{
        layout: 'menu',
        title: 'AnimoCache',
    });//resp render

});//router get

mainRouter.post('/start-game', async function(req, resp){

    resp.send({
        terminal : 0
    });//resp send
});//router get

mainRouter.post('/start-calculator', async function(req, resp){

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

mainRouter.get('/calculator', async function(req, resp){

    resp.render('initial-calculator',{
        layout: 'calculator',
        title: 'Initial Input...',
    });//resp render

});//router get

const headerRouter = require('./headerRouter');
mainRouter.use('/', headerRouter);

const calculatorRouter = require('./calculatorRouter');
mainRouter.use('/', calculatorRouter);

module.exports = mainRouter