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



router.post('/historico', function (req, res) {
    dados = Dados.historicoRegisto(req, res)
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

    console.log("inserir", req.body)
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

router.post("/alterarPassword", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.alterarPassword(req, res)

});


router.post("/obterAtividades", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.obterAtividades(req, res)

});

router.post("/obterAtividadesAlter", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.obterAtividadesAlter(req, res)

});

router.post("/atualizarAtividade", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.alterarAtividade(req, res)

});

router.post("/removerAtividade", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.removerAtividade(req, res)

});

router.post("/efetuarRegisto", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.registarUserAtividade(req, res)

});

router.post("/obterAlertasAnteriores", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.obterAlertasAnteriores(req, res)

});


router.post("/importUser", function (req, res) {
    //res.send("Ola")
    dadosAtividade = Dados.importUser(req, res)

});



router.post("/addAdmin", function (req, res) {

    dadosAtividade = Dados.addAdmin(req, res)

});

router.post("/obterUser", function (req, res) {
    res.send({
        "user": req.session.username
    })


});


router.post("/dashboard", function (req, res) {

    dadosAtividade = Dados.dashboard(req, res)

});

// router.post("/logOut", function (req, res) {
//     req.session = null
//     res.redirect(req.get('referer'));



// });
router.get('/atividade/:empresa', function (req, res) {
    var empresa = req.params.empresa;
    //res.send(empresa)
    dadosAtividade = Dados.dadosAPI(req, res)

});





module.exports = router