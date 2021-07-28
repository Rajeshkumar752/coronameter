var states = [];
var active = [];
var deaths = [];

var total, activeall, deathsall, recovered

func();

function func() {

    var request = new XMLHttpRequest;
    request.open("GET", 'https://api.covid19india.org/data.json', true);

    request.onload = function () {

        var data = JSON.parse(this.response);

        total = data.statewise[0].confirmed;
        activeall = data.statewise[0].active;
        deathsall = data.statewise[0].deaths;
        recovered = data.statewise[0].recovered;

        var head1 = document.querySelector("#head1");
        var head2 = document.querySelector("#head2");


        for (key in data.statewise) {
            active.push(data.statewise[key].active)
            states.push(data.statewise[key].state)
            deaths.push(data.statewise[key].deaths)
        }
        for (var i = 0; i < states.length; i++) {
            const st = states[i]; const act = active[i]; const dth = deaths[i];

            var myrow = document.createElement("tr");

            var newrow = "<td>" + st + "</td> <td>" + act + "</td> <td>" + dth + "</td>";
            myrow.innerHTML = newrow;

            document.querySelector("#tab").appendChild(myrow);
        }

        create();

        let cnt = 1;
        setInterval(rot, 1500);
        function rot() {
            console.log("j")
            if (cnt == 1) {
                head1.innerHTML = "Total"
                head2.innerHTML = total;
                document.querySelector(".details").style.backgroundColor = "yellow";
                cnt = 2;
            }
            else if (cnt == 2) {
                head1.innerHTML = "Active"
                head2.innerHTML = activeall;
                document.querySelector(".details").style.backgroundColor = "red";
                cnt = 3;
            }
            else if (cnt == 3) {
                head1.innerHTML = "Deaths"
                head2.innerHTML = deathsall;
                document.querySelector(".details").style.backgroundColor = "gray";
                cnt = 4;
            }
            else {
                head1.innerHTML = "Recovered"
                head2.innerHTML = recovered;
                document.querySelector(".details").style.backgroundColor = "green";
                cnt = 1;
            }
        }
    }
    request.send();
}



function create() {

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: states,
            datasets: [{
                label: 'Active',
                data: active,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
