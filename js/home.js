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
        backgroundColor: "transparent",
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

//Calculate Lighter or Darker Hex Colors
function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}

function updategrid(pos, price, high, low, volume, previousClose, changePoint, changePercent) {
    let price_ele = document.getElementsByClassName("price")[pos];
    price_ele.innerHTML = "<h2>" + price.toFixed(2) + "</h2>";

    let high_low = document.getElementsByClassName("high_low")[pos];
    high_low.innerHTML = "<p>H: " + high.toFixed(2) + "</p><p>L: " + low.toFixed(2) + "</p>"

    let bottom_ele = document.getElementsByClassName("bottom_ele")[pos];
    bottom_ele.innerHTML = "<h6>Volume: " + volume + "</h6><h6>Previous Close: " + previousClose.toFixed(2) + "</h6>";

    let change = document.getElementsByClassName("change")[pos];
    change.innerHTML = "<div><h6>" + changePercent.toFixed(3) + "%</h6></div><div><h6>" + changePoint.toFixed(2) + "</h6></div>";

    //change box color in major stock index grid based on its decreasing percentage
    if (changePercent < -5) {
        document.getElementsByClassName("chart-box")[pos].style.backgroundColor = ColorLuminance("#910101", -0.6);
    } else if (changePercent < 0) {
        document.getElementsByClassName("chart-box")[pos].style.backgroundColor = ColorLuminance("#910101", (changePercent * 3) / 25);
    }
}

function updateWorldMarket(pos, price, changePoint, changePercent) {
    let price_ele = document.getElementById("worldMarket").getElementsByClassName("price")[pos];
    price_ele.innerHTML = "<h2>" + changePercent + "%</h2>";

    let change = document.getElementById("worldMarket").getElementsByClassName("change")[pos];
    change.innerHTML = "<div><h6>" + price + "</h6></div><div><h6>" + changePoint + "</h6></div>";
    if (changePercent < 0) {
        document.getElementById("worldMarket").getElementsByClassName("price")[pos].style.color = "#ef3f49";
    } else {
        document.getElementById("worldMarket").getElementsByClassName("price")[pos].style.color = "rgba(0,128,0,.8)";
    }
}

async function loadCompanyInfoToHomePage(url, pos) {
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    console.log(data["Global Quote"]);
    //var changePercent = data["Global Quote"]["10. change percent"].replace(/%/g, '');
    updategrid(pos, parseFloat(data["Global Quote"]["05. price"]), parseFloat(data["Global Quote"]["03. high"]), parseFloat(data["Global Quote"]["04. low"]), parseFloat(data["Global Quote"]["06. volume"]), parseFloat(data["Global Quote"]["08. previous close"]), parseFloat(data["Global Quote"]["09. change"]), parseFloat(data["Global Quote"]["10. change percent"].replace(/%/g, '')));
}

async function loadInfoToHomePage() {
    const majorIndex_url = "https://financialmodelingprep.com/api/v3/quotes/index"
    var response = await fetch(majorIndex_url);
    var data = await response.json();
    console.log(data);

    //var downJones = document.getElementById
    for (key in data) {
        if (data[key].symbol == ("^DJI")) {
            updategrid(0, data[key].price, data[key].dayHigh, data[key].dayLow, data[key].volume, data[key].previousClose, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^IXIC")) {
            updategrid(1, data[key].price, data[key].dayHigh, data[key].dayLow, data[key].volume, data[key].previousClose, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^GSPC")) {
            updategrid(2, data[key].price, data[key].dayHigh, data[key].dayLow, data[key].volume, data[key].previousClose, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^VIX")) {
            updategrid(3, data[key].price, data[key].dayHigh, data[key].dayLow, data[key].volume, data[key].previousClose, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^N225")) {
            updateWorldMarket(0, data[key].price, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^HSI")) {
            updateWorldMarket(1, data[key].price, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^FTSE")) {
            updateWorldMarket(2, data[key].price, data[key].change, data[key].changesPercentage);
        } else if (data[key].symbol == ("^GDAXI")) {
            updateWorldMarket(3, data[key].price, data[key].change, data[key].changesPercentage);
        }
    }
    loadCompanyInfoToHomePage("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOG&apikey=ISMWAHX9Y5PH9DLP", 4);
    loadCompanyInfoToHomePage("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FB&apikey=ISMWAHX9Y5PH9DLP", 5);
    loadCompanyInfoToHomePage("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BAC&apikey=ISMWAHX9Y5PH9DLP", 6);
    loadCompanyInfoToHomePage("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AMZN&apikey=ISMWAHX9Y5PH9DLP", 7);
    loadCompanyInfoToHomePage("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=ISMWAHX9Y5PH9DLP", 8);
    var lastUpdate = data[0].timestamp;

    var d = new Date(lastUpdate * 1000 - 3600000 * 4);
    document.getElementsByClassName("lastUpdate")[0].innerHTML = "Last Update: " + d.toUTCString().replace('GMT', 'EST');
}

loadInfoToHomePage();

$(window).on("throttledresize", function(event) {
    console.log("screen resize");
    drawChart();
});