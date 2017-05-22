$(document).ready(function () {

    function geoFindMe() {
        var output = document.getElementById("out");


        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;


            output.innerHTML = '<p id="lat">' + latitude + '</p>' + '<p id="lng">' + longitude + '</p>'
            $("#form").show();
            // var img = new Image();
            // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            // output.appendChild(img);
            var marker = new google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                title: "Sua Posição!"
            });

            marker.setMap(map);
            map.setCenter({
                lat: latitude,
                lng: longitude
            });
            map.setZoom(15)//41.403606, -8.675150

            var lnAct=sessionStorage.getItem("ln"),laAct=sessionStorage.getItem("la")
            calcularDistancia(latitude, longitude,laAct,lnAct );
        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }

        output.innerHTML = "<p>Locating…</p>";



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


    function calcularDistancia(lat1, lon1, lat2, lon2) {
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
            $("#divQR").show()
            $("#descodificar").hide()
            alert("Posição Aceite")

        } else {
            alert("Não está no local correto")
        }



        return d;
    }

    function grau2rad(deg) {
        return deg * (Math.PI / 180)
    }




});