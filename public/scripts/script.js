var arrayDatas = [];


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



var pos = false;

$(document).on("click", "#registar", function () {
    var lat = $(this).parent().parent().find("#lat").text()
    var lng = $(this).parent().parent().find("#lng").text()



    // console.log($(this).parent().attr('id'))
    var data = {}
    data.id = $(this).parent().attr('id')
    //window.location.href = "https://logspot.herokuapp.com/registos/registoActividade/:id";


    // verificar posição 

    geoFindMe(lat, lng, data)
});


function myFunction() {
    setInterval(function () {


        $('[id="atividades"]').each(function () {
            // console.log("entr")
            var tempo = $(this).find("#countdown").text();
            // console.log("t:", tempo)
            if ((tempo >= "01:00:00") || (tempo == "00:00:00")) {
                // $(this).find("#registar").prop('disabled', true)
            }

        });
        // console.log(arrayDatas)

    }, 1000);
}


myFunction()


setInterval(function () {
    var $content3 = $('#container3');
    var alertas = false;

    for (var i = 0; i < arrayDatas.length; i++) {
        // arrayDatas[i].verificaçãoInicio=false
        //   console.log(arrayDatas[i])

        // dataAtividade = arrayDatas[i].data2
        var diferença = new Date(arrayDatas[i].data2) - new Date()
        //console.log(diferença)
        if (arrayDatas[i].verificaçãoInicio == false) {
            if (msToTime(diferença) <= "01:00:00") {
                arrayDatas[i].verificaçãoInicio = true
                alertas = true;
                console.log("registosAbertos")
                // $("#alert").css('color', '#00e1ff');

            }
        } else if ((arrayDatas[i].verificaçãoInicio == true) && (arrayDatas[i].verificaçãoFim == false)) {

            if (msToTime(diferença) <= "00:05:00") {
                arrayDatas[i].verificaçãoFim = true
                console.log("registosFechados")
                alertas = true;

            }
        }

    }
    if (alertas == true) {
        $("#alert").css('color', '#00e1ff');
        // $.ajax({
        //     type: 'POST',
        //     dataType: "json",
        //     contentType: 'application/json',
        //     url: 'https://logspot.herokuapp.com/obterAlertasAnteriores',
        //     success: function (data) {
        //         console.log("Já estou")
        //         context = {

        //             dados: data
        //         };
        //         console.log(context)
        //         $content3.handlebars('remove', '#alertas');
        //         $content3.handlebars('add', '#alertas', context, {
        //             remove: false
        //         });
        //     }
        // })


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




   var $content = $('#container');

    var row = $(this).closest("tr");
    var idAtividade = row.find("td:eq(0)").text(); // get current row 1st TD value
    console.log(idAtividade)

    var data = {};
    data.idAtividade = row.find("td:eq(0)").text();


    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/obterAtividadesAlter',
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
    $("#myModal").removeClass("in");
    $(".modal-backdrop").remove();

    $('#myModal').modal('hide');

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





$(document).on("click", "#confRegisto", function (e) {
    e.preventDefault();


    var data = {};
    data.idAtividade = sessionStorage.getItem("id");
    data.tipoRegisto = 1
    ajaxEnviar("efetuarRegisto", data)
    gravarLocalização()
});


function gravarLocalização() {
    data = {}
    data.id = 0
    console.log("entrei")
    var lnAct = sessionStorage.getItem("ln"),
        laAct = sessionStorage.getItem("la")

    geoFindMe(laAct, lnAct, data)

}



$(document).on("click", "#logOut", function (e) {
    e.preventDefault();

    //ajaxEnviar("logOut")

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    location.reload()

});



function ajaxObter(url, template, msg) {
    var $content = $('#container');
    $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/' + url,
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
        url: 'https://logspot.herokuapp.com/' + url,
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));
     
            $("#container").empty();
            $("#container").load('https://logspot.herokuapp.com/static/views/novo/check.html');

        },
        error: function (error) {
            console.log(error)
          
            $("#container").empty();
            $("#container").load('https://logspot.herokuapp.com/static/views/novo/error.html');

        }
    });
}
