var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var txt = [];
var http = require('http');



var port = process.env.PORT || 3000;

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
    res.sendFile(path.join(__dirname + '/examples/index.html'));
    //__dirname : It will resolve to your project folder.
});




app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var WiFiControl = require('wifi-control');

//  Initialize wifi-control package with verbose output 
WiFiControl.init({
    debug: true
});

// //  Try scanning for access points: 
// WiFiControl.scanForWiFi(function (err, response) {
//     if (err) console.log(err);
//     console.log(response);
// });

// var triangulate = require('wifi-triangulate')

// triangulate(function (err, location) {
//   if (err) throw err
//   console.log(location) 
// })


var wifiName = require('wifi-name');

// wifiName().then(name => {
//     console.log("Ligado:" + name);

// });
 app.post("/home3", function (req, res) {
   /* wifiName().then(name => {
   
        console.log(JSON.stringify(name))
        res.send(JSON.stringify("name"));

    });*/
         WiFiControl.scanForWiFi(function (err, response) {
        if (err) console.log(err);

        console.log(JSON.stringify(response))
        res.send(response.networks)
    });
      //res.send(JSON.stringify("Ola"));
});
/*app.post('/home4', function (req, res) {


    WiFiControl.scanForWiFi(function (err, response) {
        if (err) console.log(err);

        console.log(JSON.stringify(response))
        res.send(response.networks)
    });
});*/


// var arp = require('node-arp');

// arp.getMAC('172.23.116.254', function(err, mac) {
//     if (!err) {
//         console.log("enn")
//         console.log(mac);
//     }else{
//         console.log(err)
//         console.log(mac);
// }
// });



// var connection = mysql.createConnection({
//     host: 'webitcloud.net',
//     user: 'webitclo_G502',
//     password: 'BD1617G502590',
//     database: 'webitclo_AJP'
// });

// queryLer();



// function queryLer() {

//     app.post("/home2", function (req, res) {
//         var data = "";

//         connection.query('SELECT * from ls_empresa', function (err, rows, fields) {
//             if (!err) {
//                 console.log('The solution is: ', rows[0].id_empresa);

//                 console.log("entrei")
//                 data = rows
//                 console.log(data)
//                 res.send(JSON.stringify(rows )); //replace with your data here




//             }
//             else {
//                 console.log('Error while performing Query.', err);
//             }

//         });
//     });



//     app.post('/home', function (req, res) {
//         console.log('body: ' + JSON.stringify(req.body));
//         queryInserir(req, res)
//         res.send("sucess")

//     });



//     function queryInserir(req, res) {
//         console.log("nome:" + req.body.nome)
//         connection.query('SET foreign_key_checks = 0;', function (err, rows, fields) {
//             if (err) {
//                 console.log('Error while performing Query.212121');
//             }
//         });

//         connection.query('INSERT INTO ls_empresa(nome,id_tipo_empresa,id_contacto,cod_postal) VALUES("' + req.body.nome + '",1,1,"252")', function (err, rows, fields) {
//             if (err) {
//                 console.log('Error while performing Query.' + err);
//             }


//         });



//     }


// }





app.listen(port);

