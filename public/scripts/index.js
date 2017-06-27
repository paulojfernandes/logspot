$(document).ready(function () {


    $(document).on("click", "#user_import", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/importarUtilizadores.html')
    });



    $(document).on("click", "#user_admin_add", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/adicionarAdmin.html');
    });




    $(document).on("click", "#user_admin_alter", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/alterarAdmin.html');
    });



    $(document).on("click", "#act_list", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/listarAtividades.html');
    });



    $(document).on("click", "#act_add", function () {
        $("#container").empty();

        $("#container").load('https://logspot.herokuapp.com/static/views/adicionarAtividade.html');
    });



    $(document).on("click", "#help", function () {
        $("#container").empty();

        $("#container").load('https://logspot.herokuapp.com/static/views/ajuda.html');
    });

    $(document).on("click", "#act_alt", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/alterarAtividade.html');
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
        $("#container").load('https://logspot.herokuapp.com/static/views/configDadosPessoais.html');
    });

    $(document).on("click", "#alterPass", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/configPass.html');
    });



    $(document).on("click", "#login2", function () {
        $("body").empty();
        $("body").load('https://logspot.herokuapp.com/static/views/Login.html');
    });


    $(document).on("click", "#importarUtiizadores", function (e) {

        ajaxEnviar("importUser", lines)



    });

    $(document).on("click", "#addAdmin", function (e) {


        var data = {};

        data.nomeAdmin = $('#nomeAdmin').val();
        data.apelidoAdmin = $('#apelidoAdmin').val();
        data.emailAdmin = $('#emailAdmin').val();

        if (data.nomeAdmin != "" &&
            data.apelidoAdmin != "" &&
            data.emailAdmin != "") {
            ajaxEnviar("addAdmin", data)
        }





    });


    $(document).on("click", "#dashboard", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/dashboard.html');
    });

    $(document).on("click", "#voltarPagina", function () {
        location.reload(true)
    });



    $(document).on("click", "#act_Qr", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/gerarQRCode.html');
    });

    $(document).on("click", "#error", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/error.html');
    });

    $(document).on("click", "#check", function () {
        $("#container").empty();
        $("#container").load('https://logspot.herokuapp.com/static/views/check.html');
    });


    $(".nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });


    $(document).on("click", "#verMapa", function () {

        var modal = $(document).find(".modal-body")
        modal.empty()

        var lat = $(this).parent().parent().find("#lat").text()
        var lng = $(this).parent().parent().find("#lng").text()

        console.log(lat, lng)
        //$(this).parent().parent().find("#lat")

        console.log("lat", )
        modal.append('<img class="img-responsive" src="https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=15&size=700x700&sensor=false&markers=color:red%7C' + lat + ',' + lng + ' &key=AIzaSyC5wc3qnKNCzEWhf-5LMO6ik1zcBkyW5kw" >')


    });

















});