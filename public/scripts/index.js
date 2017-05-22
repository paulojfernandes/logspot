$(document).ready(function () {

    $("#user_import").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/importarUtilizadores.html')
    });


    $("#user_admin_add").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/adicionarAdmin.html');
    });



    $("#user_admin_alter").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/alterarAdmin.html');
    });


    $("#act_list").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/listarAtividades.html');
    });



    $("#act_add").click(function () {
        $("#container").empty();

        $("#container").load('https://logspot.herokuapp.com/static/views/novo/adicionarAtividade.html');
    });

    $("#act_alt").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/alterarAtividade.html');
    });

    $("#registo").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/registos.html');
    });
    $("#historico").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/listas.html');
    });


    $("#dadosPessoais").click(function () {
        $("#container").empty();



    



        $("#container").load('https://logspot.herokuapp.com/static/views/novo/configDadosPessoais.html');
    });
    $("#alterPass").click(function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/novo/configPass.html');
    });

});