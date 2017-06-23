var mysql = require('mysql');
var data = [];

var select = "SELECT",
    from = "FROM",
    where = "WHERE"

var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G502',
    password: 'BD1617G502590',
    database: 'webitclo_AJP'
});


function randomString(len, an) {
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}




'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'cp26.webserver.pt',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'ajp@webitcloud.net',
        pass: 'PW21617234'
    }
});


// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <ajp@webitcloud.net>', // sender address
//     to: 'paulojdfernandes@sapo.pt', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };

function sendEmail(email, password) {
    var mailOptions = {
        from: '"LOGSPOT" <ajp@webitcloud.net>',
        to: email, // Email is variable that stores the email address
        subject: 'Dados Acesso',
        text: 'Bem Vindo <br> Os seus dados de acesso à aplicação são:<br> <br> Email :' + email + ' <br> Password:' + password + ' <br> <br><br> LOGSPOT',
        html: 'Bem Vindo <br> Os seus dados de acesso à aplicação são:<br> <br> Email :' + email + ' <br> Password:' + password + ' <br> <br><br> LOGSPOT'
    };
    return transporter.sendMail(mailOptions).then(function () {
        console.log('New star email notification sent to: ' + email);
    });
}


console.log("models")



exports.dadosAtividadesRegisto = function (req, res) {

    // var select, from, where
    // var querySelect = " SELECT " + select + " FROM" + from + " WHERE " + where


    //and DATE_FORMAT(dia_realizacao, "%Y/%m/%d") = curdate(); 
    connection.query('SELECT  l_atividade.id_atividade,titulo,tipo_atividade,lat, lng , ls_empresa.nome,DATE_FORMAT(dia_realizacao, "%m/%d/%Y %H:%i") as data, DATE_FORMAT(dia_realizacao, "%Y/%m/%d %H:%i") as data2,cidade from  l_atividade,ls_tipo_atividade,ls_empresa,ls_agenda,ls_localizacao where  l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade AND l_atividade.id_empresa = ls_empresa.id_empresa   AND l_atividade.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao  ', function (err, rows, fields) {
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
    var query = select + req.body.select + from + req.body.from + where + req.body.where
    console.log(query)

    connection.query(query,
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
                    req.session.typeUser = rows[0].id_tipo_utilizador;


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


    connection.query(' INSERT INTO ls_registo(id_atividade,id_tipo_registo,id_utilizador,id_agenda) VALUES(' + req.body.idAtividade + ',' + req.body.tipoRegisto + ',(select id_utilizador from ls_utilizador,ls_contacto where ls_utilizador.id_contacto=ls_contacto.id_contacto and email="' + req.session.username + '"),(SELECT MAX(id_agenda)  FROM ls_agenda));', function (err, rows, fields) {
        if (!err) {
            res.send("Registo Efetuado")
        } else {
            console.log('Error while performing Query.', err);
        }

    });






}

exports.historicoRegisto = function (req, res) {


    connection.query("    SELECT titulo,tipo_atividade, DATE_FORMAT(dia_realizacao, '%d/%m/%Y %H:%i') AS data, cidade FROM l_atividade,ls_tipo_atividade, ls_empresa,  ls_agenda,  ls_registo, ls_localizacao,ls_utilizador, ls_contacto WHERE l_atividade.id_tipo_atividade = ls_tipo_atividade.id_tipo_atividade  AND ls_registo.id_agenda = ls_agenda.id_agenda  AND l_atividade.id_localizacao = ls_localizacao.id_localizacao AND ls_registo.id_utilizador = ls_utilizador.id_utilizador  AND ls_utilizador.id_contacto = ls_contacto.id_contacto   AND ls_contacto.email = '" + req.session.username + "' AND ls_registo.id_atividade = l_atividade.id_atividade;", function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
        }

    });



}

exports.importUser = function (req, res) {

    req.body.forEach(function (element) {


        if ((element[2] != "Email") && (element[0] != "")) {
            //  console.log("user", element[2])

            connection.query("INSERT INTO ls_contacto (email) SELECT * FROM (SELECT '" + element[2] + "') AS tempEmail WHERE NOT EXISTS (SELECT email FROM ls_contacto WHERE email = '" + element[2] + "') LIMIT 1;", function (err, rows, fields) {
                if (!err) {
                    if (rows.insertId != 0) {



                        var pass = randomString(15)
                        console.log(pass)


                        connection.query("insert into ls_utilizador(nome,apelido,pass,data_nasc,id_empresa,id_contacto,id_tipo_utilizador,id_localizacao) values('" + element[0] + "','" + element[1] + "','" + pass + "','1970-01-01',1," + rows.insertId + ",1,1); ", function (err, rows, fields) {
                            if (!err) {
                                sendEmail(element[2], pass)
                                console.log("user2", rows.insertId, element[0], element[1])

                            } else {
                                console.log('Error while performing Query.', err);
                            }

                        });

                    }
                } else {
                    console.log('Error while performing Query.', err);
                }

            });

        }
    }, this);

    // console.log("user", req.body)
    res.send("suce")







}




exports.addAdmin = function (req, res) {



    connection.query("INSERT INTO ls_contacto (email) SELECT * FROM (SELECT '" + req.body.emailAdmin + "') AS tempEmail WHERE NOT EXISTS (SELECT email FROM ls_contacto WHERE email = '" + req.body.emailAdmin + "') LIMIT 1;", function (err, rows, fields) {
        if (!err) {
            if (rows.insertId != 0) {



                var pass = randomString(15)
                console.log(pass)


                connection.query("insert into ls_utilizador(nome,apelido,pass,data_nasc,id_empresa,id_contacto,id_tipo_utilizador,id_localizacao) values('" + req.body.nomeAdmin + "','" + req.body.apelidoAdmin + "','" + pass + "','1970-01-01',1," + rows.insertId + ",2,1); ", function (err, rows, fields) {
                    if (!err) {


                        // // send mail with defined transport object
                        // transporter.sendMail(mailOptions, (error, info) => {
                        //     if (error) {
                        //         return console.log(error);
                        //     }
                        //     console.log('Message %s sent: %s', info.messageId, info.response);
                        // });
                        sendEmail(req.body.emailAdmin, pass)

                        //console.log("user2", rows.insertId, element[0], element[1])
                        res.send("sucess")

                    } else {
                        console.log('Error while performing Query.', err);
                    }

                });

            }
        } else {
            console.log('Error while performing Query.', err);
        }

    });

}





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
    console.log(req.body.dataAtividade)
    connection.query("  insert into ls_agenda(dia_realizacao) values( DATE_ADD('" + req.body.dataAtividade + "',INTERVAL 1 HOUR)); ", function (err, rows, fields) {
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

    connection.query(" UPDATE l_atividade,ls_localizacao,ls_agenda SET titulo ='" + req.body.nomeAtividade + "',lat ='" + req.body.coordLat + "',lng ='" + req.body.coordLng + "',cidade = '" + req.body.cidade + "', cod_postal = '" + req.body.codPostal + "',  qr_code = '" + req.body.qrCode + "',  dia_realizacao = +DATE_ADD('" + req.body.dataAtividade + "',INTERVAL 1 HOUR) WHERE l_atividade.id_atividade ='" + req.body.idAtividade + "'  AND l_atividade.id_agenda = ls_agenda.id_agenda AND l_atividade.id_localizacao = ls_localizacao.id_localizacao;", function (err, rows, fields) {
        if (!err) {
            res.send("Atividade Alterada")
        } else {
            console.log('Error while performing Query.', err);
            res.status(500).send("Erro BD");
        }

    });



}

exports.dadosAPI = function (req, res) {
    console.log(req.params.empresa)
    connection.query("select titulo, dia_realizacao, lat, lng from ls_agenda,l_atividade,ls_localizacao,ls_empresa where  l_atividade.id_agenda = ls_agenda.id_agenda AND l_atividade.id_localizacao= ls_localizacao.id_localizacao and ls_empresa.id_empresa= l_atividade.id_empresa and ls_empresa.nome='" + req.params.empresa + "'", function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log('Error while performing Query.', err);
            res.status(500).send("Erro BD");
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

var dados = {}
exports.dashboard = function (req, res) {
    // var dados = {}


    connection.query('select count(ls_agenda.id_agenda) as total from ls_empresa,ls_agenda,ls_utilizador,ls_registo where ls_empresa.nome ="Empresa Teste" and ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_utilizador= ls_registo.id_utilizador and ls_registo.id_agenda= ls_agenda.id_agenda and ls_agenda.dia_realizacao> DATE_SUB(now(),INTERVAL 15 minute);', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.min15 = rows
        } else {
            console.log('Error while performing Query.', err);
        }

    })

    connection.query('select count(ls_agenda.id_agenda) as total from ls_empresa,ls_agenda,ls_utilizador,ls_registo where ls_empresa.nome ="Empresa Teste" and ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_utilizador= ls_registo.id_utilizador and ls_registo.id_agenda= ls_agenda.id_agenda and ls_agenda.dia_realizacao> DATE_SUB(now(),INTERVAL 30 minute);', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.min30 = rows
        } else {
            console.log('Error while performing Query.', err);
        }

    })


    connection.query('select count(ls_agenda.id_agenda) as total from ls_empresa,ls_agenda,ls_utilizador,ls_registo where ls_empresa.nome ="Empresa Teste" and ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_utilizador= ls_registo.id_utilizador and ls_registo.id_agenda= ls_agenda.id_agenda and ls_agenda.dia_realizacao> DATE_SUB(now(),INTERVAL 45 minute);', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.min45 = rows
        } else {
            console.log('Error while performing Query.', err);
        }

    })


    connection.query('select count(ls_agenda.id_agenda) as total from ls_empresa,ls_agenda,ls_utilizador,ls_registo where ls_empresa.nome ="Empresa Teste" and ls_empresa.id_empresa=ls_utilizador.id_empresa and ls_utilizador.id_utilizador= ls_registo.id_utilizador and ls_registo.id_agenda= ls_agenda.id_agenda and ls_agenda.dia_realizacao> DATE_SUB(now(),INTERVAL 12 HOUR);', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.min60 = rows

        } else {
            console.log('Error while performing Query.', err);
        }

    })

    connection.query('select count(l_atividade.id_atividade) as total, ls_tipo_atividade.tipo_atividade from ls_tipo_atividade,l_atividade where l_atividade.id_tipo_atividade= ls_tipo_atividade.id_tipo_atividade group by tipo_atividade;', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.tipoAtividade = rows

        } else {
            console.log('Error while performing Query.', err);
        }

    })

    connection.query('select count(ls_utilizador.id_utilizador) as total from ls_empresa,ls_utilizador where ls_empresa.id_empresa =1 and ls_empresa.id_empresa = ls_utilizador.id_empresa ;', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.totalUser = rows

        } else {
            console.log('Error while performing Query.', err);
        }

    })


    connection.query('select count(l_atividade.id_atividade) as total from l_atividade, ls_empresa, ls_agenda where ls_empresa.id_empresa = l_atividade.id_empresa and l_atividade.id_agenda= ls_agenda.id_agenda and  ls_empresa.id_empresa =1;', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.totalAtividades = rows

        } else {
            console.log('Error while performing Query.', err);
        }

    })

    connection.query('select count(l_atividade.id_atividade) as total from l_atividade, ls_empresa, ls_agenda where ls_empresa.id_empresa = l_atividade.id_empresa and l_atividade.id_agenda= ls_agenda.id_agenda and  ls_empresa.id_empresa =1;', function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
            dados.totalRegistos = rows
            //res.send(dados)
        } else {
            console.log('Error while performing Query.', err);
        }

    })

    queryDashboard(' select count(id_atividade) as total3D from l_atividade, ls_agenda where l_atividade.id_agenda = ls_agenda.id_agenda  and date(ls_agenda.dia_realizacao) = DATE_SUB(curdate(), INTERVAL 3 DAY);', req, res, false)
    queryDashboard(' select count(id_atividade) as total3D from l_atividade, ls_agenda where l_atividade.id_agenda = ls_agenda.id_agenda  and date(ls_agenda.dia_realizacao) = DATE_SUB(curdate(), INTERVAL 2 DAY);', req, res, false)
    queryDashboard(' select count(id_atividade) as total3D from l_atividade, ls_agenda where l_atividade.id_agenda = ls_agenda.id_agenda  and date(ls_agenda.dia_realizacao) = DATE_SUB(curdate(), INTERVAL 1 DAY);', req, res, true)





}

function queryDashboard(query, req, res, fim) {
    console.log(fim)

    connection.query(query, function (err, rows, fields) {
        if (!err) {
            console.log("entrei");
      
            dados.tipoDados = rows
            if (fim == true) {
                res.send(dados)
            }
        } else {
            console.log('Error while performing Query.', err);
        }

    })

}

function queryStandard(query, req, res) {

}