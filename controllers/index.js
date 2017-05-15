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



module.exports = router