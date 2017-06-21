// var conta1 = document.getElementById("cont1").value;
// var conta2 = document.getElementById("cont2").value;
// var conta3 = document.getElementById("cont3").value;
// var conta4 = document.getElementById("cont4").value;

// console.log(conta1);

var ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById("myChart2").getContext('2d');
var ctx3 = document.getElementById("myChart3").getContext('2d');
var ctx4 = document.getElementById("myChart4").getContext('2d');
var ctx5 = document.getElementById("myChart5").getContext('2d');






function chartCircle(canvas, labels, data) {


    var myChart = new Chart(canvas, {
        type: 'pie',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255,99,500,1)',
                    'rgba(5, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ]
            }],
            labels: ["Conta1", "Conta2", "Conta3", "Conta4"]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            maintainAspectRatio: true
        }
    });




}

function chartLines(canvas, labels, data) {
    //console.log(data,data[0]["0"].total ,data[3]["0"].total)

    var myChart2 = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                type: 'line',
                label: "Contas",
                borderColor: '#89d6fb',
                borderWidth: 2,
                fill: false,
                data: data,

            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            defaultFontColor: ' rgba(255, 206, 86, 1)',
            maintainAspectRatio: true
        }
    });


}


chartCircle(ctx, "", [40, 50, 46, 88])
chartCircle(ctx3, "", [4, 4, 6, 8])
chartCircle(ctx4, "", [20, 4, 46, 84])

//chartLines(ctx5, "", [40, 4, 46, 8])
//chartLines(ctx2, "", [40, 4, 46, 8])