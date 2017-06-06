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
// exports.getDados = function (req, res) {
//     connection.query('SELECT * from ls_empresa', function (err, rows, fields) {
//         if (!err) {
//             data = rows;
//             console.log('The solution is: ', rows[0].id_empresa);

//             console.log("entrei");
//             res.send(rows)
//             //replace with your data here


//         } else {
//             console.log('Error while performing Query.', err);
//         }

//     });
//     //console.log("123"+data)
//     //return data;
// }



exports.dadosAtividadesRegisto = function (req, res) {

    connection.query('SELECT  l_atividade.id_atividade,titulo,tipo_atividade,ls_empresa.nome,DATE_FORMAT(dia_realizacao, "%m/%d/%Y %H:%i") as data, DATE_FORMAT(dia_realizacao, "%Y/%m/%d %H:%i") as data2,cidade from  l_atividade,ls_tipo_atividade,ls_empresa,ls_agenda,ls_localizacao where  l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade AND l_atividade.id_empresa = ls_empresa.id_empresa   AND l_atividade.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao and DATE_FORMAT(dia_realizacao, "%Y/%m/%d") = curdate();  ', function (err, rows, fields) {
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
    connection.query('SELECT l_atividade.id_atividade, qr_code, lat, lng,titulo FROM  l_atividade, ls_localizacao WHERE l_atividade.id_localizacao = ls_localizacao.id_localizacao AND id_atividade =' + req.body.id + ';', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}
exports.registarUserAtividade = function (req, res) {



    connection.query("  insert into ls_agenda(dia_realizacao) values(now()); ", function (err, rows, fields) {
        if (!err) {
            console.log("data inserida")
        } else {
            console.log('Error while performing Query.', err);
        }

    });


    connection.query(' INSERT INTO ls_registo(id_atividade,id_tipo_registo,id_utilizador,id_agenda) VALUES(' + req.body.idAtividade + ',1,(select id_utilizador from ls_utilizador,ls_contacto where ls_utilizador.id_contacto=ls_contacto.id_contacto and email="' + req.session.username + '"),(SELECT MAX(id_agenda)  FROM ls_agenda));', function (err, rows, fields) {
        if (!err) {
            res.send("Registo Efetuado")
        } else {
            console.log('Error while performing Query.', err);
        }

    });






}

exports.historicoRegisto = function (req, res) {


 connection.query("    SELECT titulo,tipo_atividade, DATE_FORMAT(dia_realizacao, '%d/%m/%Y %H:%i') AS data, cidade FROM l_atividade,ls_tipo_atividade, ls_empresa,  ls_agenda,  ls_registo, ls_localizacao,ls_utilizador, ls_contacto WHERE l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade  AND ls_registo.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao AND ls_registo.id_utilizador = ls_utilizador.id_utilizador  AND ls_utilizador.id_contacto = ls_contacto.id_contacto   AND ls_contacto.email = '"+req.session.username+"' AND ls_registo.id_atividade = l_atividade.id_atividade;", function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });

 

}

exports.importUser = function (req, res) {}

exports.obterUser = function (req, res) {


    connection.query('select nome, apelido,DATE_FORMAT(data_nasc, "%Y/%m/%d") as data,email from ls_utilizador,ls_contacto where ls_utilizador.id_contacto=ls_contacto.id_contacto and ls_contacto.email= "' + req.session.username + '" ;', function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    })



}

exports.alterarDadosUser = function (req, res) {


    console.log(req.body)

    connection.query("update ls_utilizador, ls_contacto set nome='" + req.body.nomeUser + "', apelido='" + req.body.apelidoUser + "',data_nasc='" + req.body.dataNasUser + "',email='" + req.body.emailUser + "'  where ls_utilizador.id_contacto=ls_contacto.id_contacto and ls_contacto.email='" + req.session.username + "'; ", function (err, rows, fields) {
        if (!err) {
            req.session.username = req.body.emailUser;
            console.log(req.session.username)
            res.send("Registo Alterado")
        } else {
            console.log('Error while performing Query.', err);
        }

    })





}

exports.obterAtividades = function (req, res) {

    connection.query('SELECT  l_atividade.id_atividade,titulo,tipo_atividade,ls_empresa.nome,DATE_FORMAT(dia_realizacao, "%m/%d/%Y %H:%i") as data, cidade,lat,lng,cod_postal,qr_code from  l_atividade,ls_tipo_atividade,ls_empresa,ls_agenda,ls_localizacao where  l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade AND l_atividade.id_empresa = ls_empresa.id_empresa   AND l_atividade.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao    ', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });
}



exports.obterAtividadesAlter = function (req, res) {
    connection.query('SELECT  l_atividade.id_atividade,titulo,tipo_atividade,ls_empresa.nome,DATE_FORMAT(dia_realizacao, "%Y-%m-%dT%H:%i") as data, cidade,lat,lng,cod_postal,qr_code from  l_atividade,ls_tipo_atividade,ls_empresa,ls_agenda,ls_localizacao where  l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade AND l_atividade.id_empresa = ls_empresa.id_empresa   AND l_atividade.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao and l_atividade.id_atividade=' + req.body.idAtividade + ';  ', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });
}

exports.inserirAtividade = function (req, res) {

    connection.query("  insert into ls_agenda(dia_realizacao) values('" + req.body.dataAtividade + "'); ", function (err, rows, fields) {
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


    connection.query(' INSERT into l_atividade(id_tipo_atividade,titulo,id_empresa,id_agenda,id_localizacao,qr_code)values(1,"' + req.body.nomeAtividade + ' ",( select ls_empresa.id_empresa from ls_empresa,ls_utilizador, ls_contacto where ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_contacto= ls_contacto.id_contacto and ls_contacto.email = "paulojdf@sapo.pt"),(SELECT MAX(id_agenda)  FROM ls_agenda),(SELECT MAX(id_localizacao)  FROM ls_localizacao),"' + req.body.qrCode + '");', function (err, rows, fields) {
        if (!err) {
            res.send("Registo Efetuado")
        } else {
            console.log('Error while performing Query.', err);
        }

    });

}

exports.alterarAtividade = function (req, res) {

    connection.query(" UPDATE l_atividade,ls_localizacao,ls_agenda SET titulo ='" + req.body.nomeAtividade + "',lat ='" + req.body.coordLat + "',lng ='" + req.body.coordLng + "',cidade = '" + req.body.cidade + "', cod_postal = '" + req.body.codPostal + "',  qr_code = '" + req.body.qrCode + "',  dia_realizacao ='" + req.body.dataAtividade + "' WHERE l_atividade.id_atividade ='" + req.body.idAtividade + "'  AND l_atividade.id_agenda = ls_agenda.id_agenda AND l_atividade.id_localizacao = ls_localizacao.id_localizacao;", function (err, rows, fields) {
        if (!err) {
            res.send("Atividade Alterada")
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}

exports.removerAtividade = function (req, res) {
    connection.query('SET foreign_key_checks = 0;', function (err, rows, fields) {
        if (err) {
            console.log('Error while performing Query.212121');
        }
    });

    connection.query(' delete l_atividade, ls_agenda, ls_localizacao from l_atividade, ls_agenda, ls_localizacao where id_atividade =' + req.body.idAtividade + ' and l_atividade.id_agenda = ls_agenda.id_agenda and l_atividade.id_localizacao = ls_localizacao.id_localizacao; ', function (err, rows, fields) {
        if (!err) {

            res.send("Atividade Eliminada")
        } else {
            console.log('Error while performing Query.', err);
        }

    });

}

exports.alterarPassword = function (req, res) {

    connection.query('  update ls_utilizador,ls_contacto set pass="' + req.body.passNova + '" where ls_utilizador.id_contacto=ls_contacto.id_contacto and ls_contacto.email="' + req.session.username + '" and ls_utilizador.pass="' + req.body.passAntiga + '" ;', function (err, rows, fields) {
        if (!err) {
            req.session.password = req.body.passNova
            res.send("Password Alterada")
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}

exports.obterAlertasAnteriores = function (req, res) {

   connection.query('SELECT titulo, msg_alerta, dia_realizacao FROM ls_alertas, ls_alertas_atividade,l_atividade, ls_agenda WHERE  ls_alertas_atividade.id_atividade = l_atividade.id_atividade AND l_atividade.id_agenda = ls_agenda.id_agenda AND ls_alertas_atividade.id_alerta = ls_alertas.id_alerta AND (    (DATE_SUB(dia_realizacao,INTERVAL 1 HOUR) <= NOW()AND ls_alertas.id_alerta = 1) or( (DATE_SUB(dia_realizacao,INTERVAL 1 HOUR) <= NOW()AND ls_alertas.id_alerta = 2) and (DATE_SUB(dia_realizacao,INTERVAL 5 MINUTE) <= NOW()AND ls_alertas.id_alerta = 2)   )) ORDER BY ls_agenda.dia_realizacao DESC , l_atividade.id_atividade ASC , msg_alerta DESC  LIMIT 5;', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}