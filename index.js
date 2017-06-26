var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var txt = [];
var http = require('http');

var exphbs = require('express-handlebars');
var app = express();


app.use(require('./controllers/index'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())



//Declaring Express to use Handlerbars template engine with main.handlebars as the default layout
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Defining middleware to serve static files
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname + '/views2/Login.html'));

    if (req.session.username != null & req.session.password != null) {
        res.redirect("https://logspot.herokuapp.com/logspot")
    } else {
        res.sendFile(path.join(__dirname + '/views/index.html'));



    }

});



app.get('/logspot', function (req, res) {


    if (req.session.username != null & req.session.password != null) {
        console.log("Alguem logado")
        if (req.session.typeUser == 1)
            res.sendFile(path.join(__dirname + '/views/index2.html'));
        else if (req.session.typeUser == 2)
            res.sendFile(path.join(__dirname + '/views/index3.html'));
    } else {
        res.redirect("http://localhost:3000")

    }

});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/404.html'));
});


app.post('/home', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    queryInserir(req, res)
    res.send("sucess")

});





var port = process.env.PORT || 3000;


app.listen(port)