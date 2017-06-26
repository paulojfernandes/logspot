function geoFindMe(laAct, lnAct, data) {
    //var output = document.getElementById("out");
    console.log(data.id)

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude, longitude)


  

        calcularDistancia(latitude, longitude, laAct, lnAct, data);
    }

    function error() {
        // output.innerHTML = "Unable to retrieve your location";
    }

    //  output.innerHTML = "<p>Locating…</p>";



    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: false,
            timeout: 90000,
            maximumAge: 6000000
        })


    }

    ;
}


$(document).on("click", "#obterLocalizacao", function () {


    geoFindMe()


});


function calcularDistancia(lat1, lon1, lat2, lon2, data) {
    var R = 6371000; // raio da terra em metros
    var dLat = grau2rad(lat2 - lat1); // 
    var dLon = grau2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(grau2rad(lat1)) * Math.cos(grau2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; //distancia em metros

    console.log(d.toFixed(4))
    if (d <= 50) {
        // $("#divQR").show()
        // $("#descodificar").hide()
        pos = true
       // alert("Posição Aceite")


        console.log("data", data.id)
        if (data.id > 0) {
            // alert("ajax")



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
                    sessionStorage.setItem("id", data2[0].id_atividade)
                    console.log(sessionStorage.getItem("id"))
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

                            $("#divQR").show()
                            $("#descodificar").hide()

                            window.console.log('Rendered templates: %o', $content2.handlebars('get'));
                        }
                    })
                    // history.pushState(null, null, 'registo/id=' + data.id);
                }
            });
        } else {
           // console.log("entrei timeout")
            var data = {}
            data.idAtividade = sessionStorage.getItem("id");
            data.tipoRegisto = 2

            ajaxEnviar("efetuarRegisto", data)

            setTimeout(gravarLocalização, 1000 * 60);


        }



    } else {
        alert("Não está no local correto")
    }






    // console.log(d)
    return d;
}

function grau2rad(deg) {
    return deg * (Math.PI / 180)
}