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
                    req.session.username = rows[0].email;
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
    console.log(req.session.username)
    connection.query('SELECT ls_atividade.id_atividade, qr_code, lat, lng,titulo FROM  ls_atividade, ls_localizacao WHERE ls_atividade.id_localizacao = ls_localizacao.id_localizacao AND id_atividade =' + req.body.id + ';', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}
exports.registarUserAtividade = function (req, res) {}

exports.historicoRegisto = function (req, res) {}

exports.importUser = function (req, res) {}

exports.obterUser = function (req, res) {


    connection.query('select nome, apelido,DATE_FORMAT(data_nasc, "%Y/%m/%d") as data,email from ls_utilizador,ls_contacto where ls_utilizador.id_contacto=ls_contacto.id_contacto and ls_contacto.email= "'+req.session.username+'" ;', function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    })



}

exports.alterarDadosUser = function (req, res) {


    console.log(req.body)

    connection.query("update ls_utilizador, ls_contacto set nome='" + req.body.nomeUser + "', apelido='" + req.body.apelidoUser + "',data_nasc='" + req.body.dataNasUser + "',email='"+req.body.emailUser+"'  where ls_utilizador.id_contacto=ls_contacto.id_contacto and ls_contacto.email='"+req.session.username+"'; ", function (err, rows, fields) {
        if (!err) {
            req.session.username = req.body.emailUser;
               console.log( req.session.username)
            res.send("Registo Alterado")
        } else {
            console.log('Error while performing Query.', err);
        }

    })





}

exports.obterAtividade = function (req, res) {}

exports.inserirAtividade = function (req, res) {

    connection.query('  insert into ls_agenda(dia_realizacao) values( now()); ', function (err, rows, fields) {
        if (!err) {
            console.log("data inserida")
        } else {
            console.log('Error while performing Query.', err);
        }

    });
    connection.query('insert into ls_localizacao(cod_postal,cidade,lat,lng) values("' + req.body.codPostal + '","' + req.body.cidade + '","' + req.body.coordLat + '","' + req.body.coordLng + '"); ', function (err, rows, fields) {
        if (!err) {
            console.log("Localizaçao inserida")
        } else {
            console.log('Error while performing Query.', err);
        }

    });


    connection.query(' INSERT into ls_atividade(id_tipo_atividade,titulo,id_empresa,id_agenda,id_localizacao,qr_code)values(1,"' + req.body.nomeAtividade + ' ",( select ls_empresa.id_empresa from ls_empresa,ls_utilizador, ls_contacto where ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_contacto= ls_contacto.id_contacto and ls_contacto.email = "paulojdf@sapo.pt"),(SELECT MAX(id_agenda)  FROM ls_agenda),(SELECT MAX(id_localizacao)  FROM ls_localizacao),"' + req.body.qrCode + '");', function (err, rows, fields) {
        if (!err) {
            res.send("Registo Efetuado")
        } else {
            console.log('Error while performing Query.', err);
        }

    });

}

exports.alterarAtividade = function (req, res) {}

exports.removerAtividade = function (req, res) {}

//exports.receberDadosAtividade = function (req, res) {}