const Handlebars = require('handlebars');
const express = require("express");
const headerRouter = express.Router();

headerRouter.post('/add_block', function(req, resp){

    resp.send({
        number : parseInt(req.body.number),
        terminal : 0
    });//resp send

});//router get

headerRouter.post('/start_simulation', function(req, resp){

    message = req.body.message
    console.log(message)

    resp.send({
        size : parseInt(req.body.size),
        numArr : req.body.numArr,
        terminal : 0
    });//resp send

});//router get

module.exports = headerRouter