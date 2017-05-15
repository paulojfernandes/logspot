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






// var connection = mysql.createConnection({
//     host: 'webitcloud.net',
//     user: 'webitclo_G502',
//     password: 'BD1617G502590',
//     database: 'webitclo_AJP'
// });

// queryLer();



// function queryLer() {

// app.post("/login", function (req, res) {
//     var data = "";

//     connection.query('SELECT * from ls_empresa', function (err, rows, fields) {
//         if (!err) {
//             console.log('The solution is: ', rows[0].id_empresa);

//             console.log("entrei")
//             data = rows
//             console.log(data)
//             res.send(JSON.stringify(rows)); //replace with your data here




//         } else {
//             console.log('Error while performing Query.', err);
//         }

//     });
// });
//}




// app.post('/login', function (req, res) {
//     connection.query('SELECT * FROM ls_utilizador,ls_contacto WHERE ls_contacto.email="' + req.body.email + '" AND ls_utilizador.pass="' + req.body.pass + '" and ls_utilizador.id_contacto=ls_contacto.id_contacto;',
//         function (err, rows, fields) {
//             if (!err) {


//                 if (rows[0] === undefined) {
//                     //console.log(rows)
//                     console.log(err)
//                     // res.send({erro:"erro"})
//                     res.status(500).send("Email ou Password Errada");


//                 } else {
//                     req.session.username = rows[0].nome;
//                     req.session.password = rows[0].pass;
//                     res.status(200).send("sucess")

//                 }



//                 // console.log("Alguem logado", req.session.username)

//             } else {
//                 console.log('Error while performing Query.', err);
//                  res.status(500).send("Serviço Indisponivel, Tente Mais Tarde!");
//             }
//         });

//    // Set the sessions.

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








app.listen(3000, function () {
    console.log('Server up: http://localhost:3000');
});