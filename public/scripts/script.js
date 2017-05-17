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
         crossDomain: true,
        url: 'https://logspot.herokuapp.com/registos/registoActividade/',
        success: function (data2) {
            console.log('success:');
            console.log(JSON.stringify(data));
            $("#content").empty()
            history.pushState(null, null, '/id=' + data.id);
            $("#content").load("https://webitcloud.net/PW/1617/AJP/lqr.html")
       


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

//myFunction()
