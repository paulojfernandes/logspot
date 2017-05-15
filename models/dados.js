var mysql = require('mysql');
var data = [];



var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G502',
    password: 'BD1617G502590',
    database: 'webitclo_AJP'
});

console.log("models")
// Get a particular comment
exports.getDados = function (req, res) {
    connection.query('SELECT * from ls_empresa', function (err, rows, fields) {
        if (!err) {
            data = rows;
            console.log('The solution is: ', rows[0].id_empresa);

            console.log("entrei");
            res.send(rows)
            //replace with your data here


        } else {
            console.log('Error while performing Query.', err);
        }

    });
    //console.log("123"+data)
    //return data;
}



exports.dadosAtividadesRegisto = function (req, res) {

    connection.query('SELECT  ls_atividade.id_atividade,titulo,tipo_atividade,ls_empresa.nome,DATE_FORMAT(dia_realizacao, "%m/%d/%Y %H:%i") as data, cidade from  ls_atividade,ls_tipo_atividade,ls_empresa,ls_agenda,ls_localizacao where  ls_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade AND ls_atividade.id_empresa = ls_empresa.id_empresa   AND ls_atividade.id_agenda = ls_agenda.id_agenda  AND ls_atividade.id_localizacao = ls_localizacao.id_localizacao;  ', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });
}

exports.dadosLogin = function (req, res) {
    console.log("entrei login models")

    connection.query('SELECT * FROM ls_utilizador,ls_contacto WHERE ls_contacto.email="' + req.body.email + '" AND ls_utilizador.pass="' + req.body.pass + '" and ls_utilizador.id_contacto=ls_contacto.id_contacto;',
        function (err, rows, fields) {
            if (!err) {


                if (rows[0] === undefined) {
                    //console.log(rows)
                    console.log(err)
                    // res.send({erro:"erro"})
                    res.status(500).send("Email ou Password Errada");


                } else {
                    req.session.username = rows[0].nome;
                    req.session.password = rows[0].pass;
                    res.status(200).send("sucess")

                }



                // console.log("Alguem logado", req.session.username)

            } else {
                console.log('Error while performing Query.', err);
                res.status(500).send("Serviço Indisponivel, Tente Mais Tarde!");
            }
        });
}

exports.receberDadosAtividade = function (req, res) {
    console.log(req.body.id)
    connection.query('SELECT ls_atividade.id_atividade, qr_code, lat, lng FROM  ls_atividade, ls_localizacao WHERE ls_atividade.id_localizacao = ls_localizacao.id_localizacao AND id_atividade =' + req.body.id + ';', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}