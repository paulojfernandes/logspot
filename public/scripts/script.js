var arrayDatas = [];

// $(function domReady($) {
//     // Cache the jQuery object
//     var $content = $('#content');


//     // $content.handlebars('add', '#template', { remove: false });
//     $content.handlebars('add', '#template2', {
//         remove: false
//     });

//     // Testing only!

//     // $content.handlebars('remove', '#template'); // Remove single template id
//     // $content.handlebars('remove'); // Remove all templates
//     window.console.log('Rendered templates: %o', $content.handlebars('get')); // Get the rendered templates for the content element
//     window.console.log('Compiled templates: %o', $content.handlebars('compiled')); // Get the compiled templates for the content element





//     var $content = $('#content');

//     $(function () {

//         function atualizar() {
//             console.log("entrei")

//             //query2()

//             var request = $.ajax({
//                 type: 'POST',
//                 dataType: "json",
//                 contentType: 'application/json',
//                 url: 'http://localhost:3000/home2'
//             });
//             request.done(function (data) {
//                 //alert(JSON.stringify(data))
//                 context = {
//                     dados: data
//                 };
//                 console.log(context)
//                 $content.handlebars('remove', '#template2', context, {
//                     remove: false
//                 });
//                 $content.handlebars('add', '#template2', context, {
//                     remove: false
//                 });
//             })

//         };


//         atualizar()
//     });

// });

function countdw() {

    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        console.log(finalDate)
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('%H:%M:%S'));

        });

    });
};


// document.cookie = "paulo=PAulo"


// function getCookie() {
//     var c_name = document.cookie; // listando o nome de todos os cookies
//     if (c_name != undefined && c_name.length > 0) // verificando se o mesmo existe
//     {
//         var posCookie = c_name.indexOf("paulo"); // checando se existe o cookieSeuNome 
//         if (posCookie >= 0) //se existir o cookie mostra um alert no browser
//         {
//             alert("Cookie Existe!!!");
//             console.log(posCookie)
//         } else
//             alert("Cookie não existe!!!");
//         console.log(posCookie)
//     }


// }



$(document).on("click", "#registar", function () {

    // console.log($(this).parent().attr('id'))
    var data = {}
    data.id = $(this).parent().attr('id')
    //window.location.href = "http://localhost:3000/registos/registoActividade/:id";

    console.log(data);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/registos/registoActividade/',
        success: function (data2) {
            console.log('success:');
            console.log(data2);
            sessionStorage.setItem("ln", data2[0].lng)
            sessionStorage.setItem("la", data2[0].lat)
            sessionStorage.setItem("q", data2[0].qr_code)
            sessionStorage.setItem("id", data2[0].id_atividade)
            console.log(sessionStorage.getItem("id"))
            $("#container").empty()
            $("#container").load("http://localhost:3000/static/views/lqr.html", function (response, status, xhr) {
                if (status == "error") {
                    var msg = "Sorry but there was an error: ";
                    $("#error").html(msg + xhr.status + " " + xhr.statusText);
                } else {
                    var $content2 = $('#content2');

                    $content2.handlebars('add', '#templateDadosAtividades2', data2[0], {
                        remove: false
                    });

                    window.console.log('Rendered templates: %o', $content2.handlebars('get'));
                }
            })



            // history.pushState(null, null, 'registo/id=' + data.id);



        }
    });









});


function myFunction() {
    setInterval(function () {


        $('[id="atividades"]').each(function () {
            console.log("entr")
            var tempo = $(this).find("#countdown").text();
            console.log("t:", tempo)
            if ((tempo >= "01:00:00") || (tempo == "00:00:00")) {
                $(this).find("#registar").prop('disabled', true)
            }

        });
        // console.log(arrayDatas)

    }, 1000);
}


myFunction()


setInterval(function () {


    for (var i = 0; i < arrayDatas.length; i++) {
        // arrayDatas[i].verificaçãoInicio=false
        // console.log(arrayDatas[i])

        // dataAtividade = arrayDatas[i].data2
        var diferença = new Date(arrayDatas[i].data2) - new Date()
        console.log(diferença)
        if (arrayDatas[i].verificaçãoInicio == false) {
            if (msToTime(diferença) <= "01:00:00") {
                arrayDatas[i].verificaçãoInicio = true
                console.log("registosAbertos")
                $("#alert").css('color', '#00e1ff');

            }
        } else if ((arrayDatas[i].verificaçãoInicio == true) && (arrayDatas[i].verificaçãoFim == false)) {

            if (msToTime(diferença) <= "00:05:00") {
                arrayDatas[i].verificaçãoFim = true
                console.log("registosFechados")

            }
        }

    }

}, 1000)


function msToTime(diferença) {
    var milliseconds = parseInt((diferença % 1000) / 100),
        seconds = parseInt((diferença / 1000) % 60),
        minutes = parseInt((diferença / (1000 * 60)) % 60),
        hours = parseInt((diferença / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var tempoRestante = hours + ":" + minutes + ":" + seconds;
    //console.log(tempoRestante)
    return tempoRestante;
}

$(document).on("click", "#alert", function (e) {
    e.preventDefault();

     $(this).css('color', 'white');
});

$(document).on("click", "#alterarDadosUser", function (e) {
    e.preventDefault();


    var data = {};
    data.nomeUser = $('#nomeUser').val();
    data.apelidoUser = $('#apelidoUser').val();
    data.emailUser = $('#emailUser').val();
    data.dataNasUser = new Date($('#dataNasUser').val());

    // $('#nome').val("");
    // $('#codPostal').val("");
    // $('#cidade').val("");
    // $('#coordLat').val("");
    // $('#coordLng').val("");
    // $('#qrCode').val("");
    // $('#dataAtividade').val("");

    console.log(data);
    ajaxEnviar("alterarDadosUser", data)


});


$(document).on("click", "#alterarPassword", function (e) {
    e.preventDefault();


    if ($('#passNova').val() == $('#passNova2').val()) {
        var data = {};
        data.passAntiga = $('#passAntiga').val();
        data.passNova = $('#passNova').val();



        console.log(data);
        ajaxEnviar("alterarPassword", data)




    } else {
        alert("passerrada")
    }


});








$(document).on("click", "#inserirAtividade", function (e) {
    e.preventDefault();


    var data = {};
    data.nomeAtividade = $('#nomeAtividade').val();
    data.codPostal = $('#codPostal').val();
    data.cidade = $('#cidade').val();
    data.coordLat = $('#coordLat').val();
    data.coordLng = $('#coordLng').val();
    data.qrCode = $('#qrCode').val();
    data.dataAtividade = new Date($('#dataAtividade').val());
    // $('#nome').val("");
    // $('#codPostal').val("");
    // $('#cidade').val("");
    // $('#coordLat').val("");
    // $('#coordLng').val("");
    // $('#qrCode').val("");
    // $('#dataAtividade').val("");

    console.log(data);

    ajaxEnviar("inserirAtividade", data)



});




$(document).on("click", "#obterAtividade-alterar", function (e) {
    e.preventDefault();

    var row = $(this).closest("tr");
    var idAtividade = row.find("td:eq(0)").text(); // get current row 1st TD value
    console.log(idAtividade)

    var data = {};
    data.idAtividade = row.find("td:eq(0)").text();


    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/obterAtividadesAlter',
        success: function (data) {
            console.log("Já estou")
            context = {
                dados: data
            };
            console.log(context)
            $content.handlebars('remove', '#templateAlterAtividades')

            $content.handlebars('add', '#templateAlterAtividades', context, {
                remove: false
            });

            $("#myModal").modal("toggle");


        }
    })

});



$(document).on("click", "#removerAtividade", function (e) {
    e.preventDefault();
    //return confirm("Do you really want to do this?") ;

    var row = $(this).closest("tr");
    var idAtividade = row.find("td:eq(0)").text(); // get current row 1st TD value

    var data = {};
    data.idAtividade = idAtividade;

    ajaxEnviar("removerAtividade", data)




});


$(document).on("click", "#atualizarAtividade", function (e) {
    e.preventDefault();


    var idAtividade = $(".modal-body").attr('id'); // get current row 1st TD value
    console.log(idAtividade)

    var data = {};
    data.idAtividade = idAtividade;
    data.nomeAtividade = $('#nomeAtividade').val();
    data.codPostal = $('#codPostal').val();
    data.cidade = $('#cidade').val();
    data.coordLat = $('#coordLat').val();
    data.coordLng = $('#coordLng').val();
    data.qrCode = $('#qrCode').val();
    data.dataAtividade = new Date($('#dataAtividade').val());
    // $('#nome').val("");
    // $('#codPostal').val("");
    // $('#cidade').val("");
    // $('#coordLat').val("");
    // $('#coordLng').val("");
    // $('#qrCode').val("");
    // $('#dataAtividade').val("");

    console.log(data);

    ajaxEnviar("atualizarAtividade", data)

});



/* em contrução*/

$(document).on("click", "#importarUtiizadores", function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/importar',
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });

});
/* */

$(document).on("click", "#confRegisto", function (e) {
    e.preventDefault();


    var data = {};
    data.idAtividade = sessionStorage.getItem("id");

    ajaxEnviar("efetuarRegisto", data)

});




function ajaxObter(url, template, msg) {
    var $content = $('#container');
    $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: 'application/json',
        url: 'http://localhost:3000/' + url,
        success: function (data) {
            console.log("Já estou")
            context = {
                dados: data
            };
            console.log(context)

            $content.handlebars('add', template, context, {
                remove: false
            });

        }
    })
}

function ajaxEnviar(url, data, template, msg) {


    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/' + url,
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });
}