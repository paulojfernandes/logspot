var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var txt = [];
var http = require('http');



//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs = require('express-handlebars');
var app = express();
//Declaring Express to use Handlerbars template engine with main.handlebars as the default layout
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Defining middleware to serve static files
app.use('/static', express.static('public'));
app.get('/home', function (req, res) {
 res.sendFile(path.join(__dirname + '/views/index.html'));
  //     res.sendFile(path.join('https://webitcloud.net' + '/PW/1617/AJP/index.html'));
   // https://webitcloud.net/PW/1617/AJP/index.html
    //__dirname : It will resolve to your project folder.
});



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G502',
    password: 'BD1617G502590',
    database: 'webitclo_AJP'
});








    app.post('/home', function (req, res) {
        console.log('body: ' + JSON.stringify(req.body));
        queryInserir(req, res)
        res.send("sucess")

    });



    function queryInserir(req, res) {
        console.log("nome:" + req.body.dist)
        connection.query('SET foreign_key_checks = 0;', function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.212121');
            }
        });

        connection.query('INSERT INTO localteste (latitude,longitude,resposta) VALUES("' + req.body.lat + '","' + req.body.lng + '","' + req.body.dist + '")', function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.' + err);
            }


        });



    }




var port = process.env.PORT || 3000;


app.listen(port)

// app.listen(3000, function () {
//     console.log('Server up: http://localhost:3000');
// });

