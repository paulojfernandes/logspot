var fileChooser = document.getElementById('qrcode')
var content = document.getElementById('imgQR')
console.log(content)
var qr = new QCodeDecoder();
var img = new Image();
if (typeof window.FileReader === 'undefined') {
    content.className = 'fail';
    content.innerHTML = 'File API &amp; FileReader API are not supported in your browser.  Try on a new-ish Android phone.';
}


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1093669-11']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
        '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

function obterimg() {
    console.log("entrada")
    fileChooser.onchange = function (e) {
        e.preventDefault();

        var file = fileChooser.files[0],
            reader = new FileReader();

        reader.onerror = function (event) {
            content.innerHTML = "Error reading file";
        }

        reader.onload = function (event) {


            // files from the Gallery need the URL adjusted
            if (event.target.result && event.target.result.match(/^data:base64/)) {
                img.src = event.target.result.replace(/^data:base64/, 'data:image/jpeg;base64');
            } else {
                img.src = event.target.result;
            }

            // Guess photo orientation based on device orientation, works when taking picture, fails when loading from gallery
            if (navigator.userAgent.match(/mobile/i) && window.orientation === 0) {
                img.height = 250;
                img.className = 'rotate';
            } else {
                img.width = 300;
            }
            console.log(img)

            content.innerHTML = '';
            content.appendChild(img);
            $("#descodificar").show()




        };

        reader.readAsDataURL(file);

        return false;
    }
}

$("#descodificar").on("click", function (e) {
    e.preventDefault()
    qr.decodeFromImage(img, function (err, result) {
        if (err) {
            alert(err)
        };

        //console.log(result)
        verificarQRCode(result)

    });


});




function verificarQRCode(qr) {
    console.log(sessionStorage.getItem("q"))
    if (qr == sessionStorage.getItem("q")) {
        //  alert("QRCODE correcto, será registado a sua entrada")
        $("#divLocalizacao").hide()
        $("#divQR").hide()
        $("#confirmarRegisto").show()

    } else {
        alert("QRCODE incorreto!")
    }

}




$(document).on("click", "#qrcode", function () {
    console.log("entrei")

    obterimg()


});