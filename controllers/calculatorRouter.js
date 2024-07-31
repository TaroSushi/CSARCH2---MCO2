const Handlebars = require('handlebars');
const express = require("express");
const calculatorRouter = express.Router();

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

calculatorRouter.post('/input-start', function(req, resp){
    
    req.session.bits_word = req.body.bits_word
    req.session.words_block = req.body.words_block
    req.session.cache_size = req.body.cache_size
    req.session.memory_size = req.body.memory_size
    req.session.read_type = req.body.read_type
    resp.redirect('/input-calculator')

});//router get

calculatorRouter.get('/input-calculator', function(req, resp){

    resp.render('input-calculator',{
        layout: 'calculator',
        title: 'Input MM',
        bits_word: req.session.bits_word,
        words_block: req.session.words_block,
        cache_size: req.session.cache_size,
        memory_size: req.session.memory_size,
        read_type: req.session.read_type
    });//resp render

});//router get


module.exports = calculatorRouter