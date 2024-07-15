const Handlebars = require('handlebars');
const express = require("express");
const headerRouter = express.Router();


headerRouter.post('/add_block', function(req, resp){

    resp.send({
        number : parseInt(req.body.number),
        terminal : 0
    });//resp send

});//router get

module.exports = headerRouter