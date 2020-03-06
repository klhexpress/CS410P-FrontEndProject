google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Country', 'Number of Companies'],
        ['Sweden', 3],
        ['Taiwan', 7],
        ['Russia', 5],
        ['Spain', 9],
        ['Brazil', 7],
        ['India', 7],
        ['Italy', 9],
        ['Australia', 8],
        ['Canada', 11],
        ['SouthKorea', 15],
        ['Netherland', 12],
        ['Switzerland', 15],
        ['Britain', 25],
        ['Germany', 28],
        ['France', 29],
        ['Japan', 52],
        ['China', 103],
        ['United States', 134]
    ]);

    var options = {
        //backgroundColor: 'transparent',
        title: 'Fortune 500 Companies by Country',
        titleTextStyle: {
            fontSize: 22,
        },
        tooltip: { trigger: 'selection' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);


    google.visualization.events.addListener(chart, 'onmouseover', function(entry) {
        chart.setSelection([{ row: entry.row }]);
    });

    google.visualization.events.addListener(chart, 'onmouseout', function(entry) {
        chart.setSelection([]);
    });
}

function updategrid(pos, price, high, low, time) {
    let price_ele = document.getElementsByClassName("price")[pos];
    price_ele.innerHTML = "<h2>5000</h2>"

    let high_low = document.getElementsByClassName("high_low")[pos];
    high_low.innerHTML = "<p>H: 500</p><p>L: 500</p>"

    let time_ele = document.getElementsByClassName("timezones")[pos];
    time_ele.innerHTML = "<h6>PST: 9</h6> <h6>CST: 10</h6> <h6>EST: 11</h6>"

    let change = document.getElementsByClassName("change")[pos];
    change.innerHTML = "<div><h6>050%</h6></div><div><h6>7.07</h6></div>"
}

updategrid(0, 1, 1, 1, 1);

$(window).on("throttledresize", function(event) {
    console.log("screen resize");
    drawChart();
});