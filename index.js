var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var txt = [];
var http = require('http');
// var cookieParser = require('cookie-parser')
// var cookieSession = require('cookie-session');
//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs = require('express-handlebars');
var app = express();

var cors = require('express-cors')

app.use(cors({
    allowedOrigins: [
        'github.com', 'google.com', 'webitcloud.net','logpspot.herokuapp.com'
    ]
}))

app.use(require('./controllers/index'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


// app.use(cookieParser());


// app.use(cookieSession({
//     name: 'session',
//     keys: ["abc"],

//     // Cookie Options
//     maxAge: 60 * 60 * 1000,
//     path: "/",
//     httpOnly: false

// }))



//app.use(require('./middlewares/users'))




//Declaring Express to use Handlerbars template engine with main.handlebars as the default layout
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Defining middleware to serve static files
app.use('/static', express.static('public'));
app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
    if (req.session.username == null & req.session.password == null) {
        console.log("Alguem logado212121")
        res.redirect("/")
    }
    //__dirname : It will resolve to your project folder.
});
app.get('/listas', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/listas.html'));
    if (req.session.username == null & req.session.password == null) {
        console.log("Alguem logado212121")
        res.redirect("/")
    }
    //__dirname : It will resolve to your project folder.
});
app.get('/registos', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/registos.html'));
    // if (req.session.username == null & req.session.password == null) {
    //     console.log("Alguem logado212121")
    //     res.redirect("/")
    // }
    //__dirname : It will resolve to your project folder.
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views2/Login.html'));

    if (req.session.username != null & req.session.password != null) {
        console.log("Alguem logado212121")
        res.redirect("/home")
    }
    //__dirname : It will resolve to your project folder.
});
// app.get('/registos/registoActividade/',function(req,res){
// //res.sendFile(path.join(__dirname + '/views/lqr.html'));
// });




app.post('/home', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    queryInserir(req, res)
    res.send("sucess")

});



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





var port = process.env.PORT || 3000;


app.listen(port)


// app.listen(3000, function () {
//     console.log('Server up: http://localhost:3000');
// });