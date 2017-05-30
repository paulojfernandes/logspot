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
//                 url: 'https://logspot.herokuapp.com/home2'
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





function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}


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
    //window.location.href = "https://logspot.herokuapp.com/registos/registoActividade/:id";

    console.log(data);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/registos/registoActividade/',
        success: function (data2) {
            console.log('success:');
            console.log(data2);
            sessionStorage.setItem("ln", data2[0].lng)
            sessionStorage.setItem("la", data2[0].lat)
            sessionStorage.setItem("q", data2[0].qr_code)
            console.log(sessionStorage.getItem("ln"), sessionStorage.getItem("la"), sessionStorage.getItem("q"))
            $("#container").empty()
            $("#container").load("https://logspot.herokuapp.com/static/views/lqr.html", function (response, status, xhr) {
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
            //console.log("t:",tempo)
            if (tempo <= "09:32:30") {
                $(this).find("#obter").prop('disabled', true)
            }

        });


    }, 1000);
}




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

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/alterarDadosUser',
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });

});


$(document).on("click", "#alterarPassword", function (e) {
    e.preventDefault();


    if ($('#passNova').val() == $('#passNova2').val()) {
        var data = {};
        data.passAntiga = $('#passAntiga').val();
        data.passNova = $('#passNova').val();



        console.log(data);

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'https://logspot.herokuapp.com/alterarPassword',
            success: function (data) {
                console.log('success:');
                console.log(JSON.stringify(data));


            }
        });



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

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/inserirAtividade',
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });

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

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/removerAtividade',
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });



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

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://logspot.herokuapp.com/atualizarAtividade',
        success: function (data) {
            console.log('success:');
            console.log(JSON.stringify(data));


        }
    });







});




//myFunction()