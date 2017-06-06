$(document).ready(function () {


    $(document).on("click", "#user_import", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/importarUtilizadores.html')
    });



    $(document).on("click", "#user_admin_add", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/adicionarAdmin.html');
    });




    $(document).on("click", "#user_admin_alter", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/alterarAdmin.html');
    });



    $(document).on("click", "#act_list", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/listarAtividades.html');
    });



    $(document).on("click", "#act_add", function () {
        $("#container").empty();

        $("#container").load('https://logspot.herokuapp.com/static/views/novo/adicionarAtividade.html');
    });


    $(document).on("click", "#act_alt", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/alterarAtividade.html');
    });


    $(document).on("click", "#registo", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/registos.html');
    });

    $(document).on("click", "#historico", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/listas.html');
    });


    $(document).on("click", "#dadosPessoais", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/configDadosPessoais.html');
    });

    $(document).on("click", "#alterPass", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/configPass.html');
    });



    $(document).on("click", "#login2", function () {
        $("body").empty();
        $("body").load('https://logspot.herokuapp.com/static/views/Login.html');
    });





});