
var ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById("myChart2").getContext('2d');
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

