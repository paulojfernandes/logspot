var express = require('express'),
    Dados = require('../models/dados.js'),
    router = express.Router(),
    bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())

var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session');


router.use(cookieParser());


router.use(cookieSession({
    name: 'session',
    keys: ["abc"],

    // Cookie Options
    maxAge: 60 * 60 * 1000,
    path: "/",
    httpOnly: false

}))
var dadosAtividade = "";



router.post('/home2', function (req, res) {
    dados = Dados.getDados(req, res)
});


router.post('/registoActividade', function (req, res) {
    dados = Dados.dadosAtividadesRegisto(req, res)
});


router.post('/login', function (req2, res) {
    console.log("entrei login controllers", req2.body)
    login2 = Dados.dadosLogin(req2, res)
});


// router.post("/registo/enviarDadosAtivades", function (req, res) {
//     var dados = req.body.id;
//     console.log(dados)
//   // res.redirect('/registos/verLocal&QR');
//   res.send("sucess")


// });

router.post("/registos/registoActividade/", function (req, res) {
    //res.sendFile(path.join(__dirname + '/views/lqr.html'));
    console.log("aa")
    //res.send("Ola")
     dadosAtividade = Dados.receberDadosAtividade(req, res)

});

router.post("/inserirAtividade", function (req, res) {

    console.log("inserir",req.body)
    //res.send("Ola")
     dadosAtividade = Dados.inserirAtividade(req, res)

});


router.post("/obterUtilizador", function (req, res) {


    //res.send("Ola")
     dadosAtividade = Dados.obterUser(req, res)

});

router.post("/alterarDadosUser", function (req, res) {
    //res.send("Ola")
     dadosAtividade = Dados.alterarDadosUser(req, res)

});




module.exports = router