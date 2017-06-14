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


        // output.innerHTML = '<p id="lat">' + latitude + '</p>' + '<p id="lng">' + longitude + '</p>'
        // $("#form").show();
        // var img = new Image();
        // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        //"https://maps.googleapis.com/maps/api/staticmap?center=%20%2041.1476629%20%20,%20%20-8.6078973%20&zoom=15&size=700x300&sensor=false&markers=color:red%7C41.1476629,-8.6078973"
        // output.appendChild(img);


        // var marker = new google.maps.Marker({
        //     position: {
        //         lat: latitude,
        //         lng: longitude
        //     },
        //     title: "Sua Posição!"
        // });

        // marker.setMap(map);

        // var lnAct = sessionStorage.getItem("ln"),
        //     laAct = sessionStorage.getItem("la")

        // var local = new google.maps.LatLng(laAct, lnAct);
        // var myCity = new google.maps.Circle({
        //     center: local,
        //     radius: 500,
        //     strokeColor: "#FF0000",
        //     strokeOpacity: 0.6,
        //     strokeWeight: 2,
        //     fillColor: "#FF0000",
        //     fillOpacity: 0.2
        // });
        // myCity.setMap(map);


        // map.setCenter({
        //     lat: latitude,
        //     lng: longitude
        // });

        // map.setZoom(15) //41.403606, -8.675150

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
    if (d <= 150000) {
        // $("#divQR").show()
        // $("#descodificar").hide()
        pos = true
        alert("Posição Aceite")


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