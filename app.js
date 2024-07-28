
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.use(express.static('public'));

const router = require('./controllers/mainRouter')
app.use("/", router);

const port = process.env.PORT | 3000;
app.listen(port, function(){
    console.log('Listening at port '+port);
});
