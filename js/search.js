const gs = [];
var oneDayCSV_firstGraph;
var oneDayCSV_secondGraph;

function JsonToCSV(JsonArray) {
    var JsonFields = Object.keys(JsonArray[0]);
    console.log(JsonFields)
    var csvStr = JsonFields.join(",") + "\n";

    JsonArray.forEach(element => {
        date = element.date,
            low = element.low,
            high = element.high

        csvStr += date + ',' + low + ',' + high + "\n";
    })
    return csvStr;
}

function createChart(seriesOptions) {

    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
}


function createFirstGraph(json) {
    var clone = [];

    var mostrecentdate = json[0].date.slice(0, 10);
    //var testing = mostrecentdate.splice(0, 10);
    console.log("Most recent: " + mostrecentdate);
    for (key in json) {
        // copy each property into the clone
        if (json[key].date.includes(mostrecentdate)) {
            let temp = {
                    date: json[key].date,
                    low: json[key].low,
                    high: json[key].high,
                }
                //console.log(json[key]);
            clone.push(temp);
        }
    }
    oneDayCSV_firstGraph = JsonToCSV(clone);
    console.log(json);

    /*
        var data1 = [];
        var data2 = [];

        for (key in json) {
            // copy each property into the clone
            if (json[key].date.includes(mostrecentdate)) {
                let temp = {
                        date: json[key].date,
                        low: json[key].low,
                        high: json[key].high,
                        //middle: json[key]["1. open"]
                    }
                    //console.log(json[key]);

                //date = new Date ()
                let year = json[key].date.slice(0, 4)
                let month = json[key].date.slice(5, 7)
                let day = json[key].date.slice(8, 10)
                let hour = json[key].date.slice(11, 13)
                let minute = json[key].date.slice(14, 16)
                let sec = json[key].date.slice(17, )
                    //console.log(year + month + day + " hour = " + hour + " min = " + minute + "sec = " + sec)
                    //Date.parse(json[key].date.slice(0, 19))
                clone.unshift([new Date(year, month, day, hour, minute, sec), json[key].low, json[key].high]);
                /*var d = new Date(parseInt(Date.parse(json[key].date.slice(0, 19)), 10));
                var ds = d.toString('MM/dd/yy HH:mm:ss');
                console.log(ds);
                //data1.push([Date.parse(json[key].date.slice(0, 19)), json[key].low]);
                //data2.push([Date.parse(json[key].date.slice(0, 19)), json[key].high]);
            }
        }*/

    //oneDayCSV_firstGraph = clone;
    //console.log(clone);
    gs.push(
        new Dygraph(
            document.getElementById("div1"),
            oneDayCSV_firstGraph, {
                //labels: ["x", "low", "high"],
                rollPeriod: 14,
                showRoller: false,
                legend: 'always',
                colors: ["rgba(178,34,34,.8)", "rgba(0,128,0,.8)"],
                axisLineColor: "#d3d3d3",
                gridLineColor: "#d3d3d3",
                axes: {
                    x: {
                        drawGrid: false,
                        valueParser: function(x) { return 1000 * parseInt(x); },
                    },
                    y: {
                        axisLabelFormatter: function(v) {
                            return "$" + v; // controls formatting of the y-axis labels
                        }
                    }
                },
                axisLineWidth: 2.5,
                strokeWidth: 2,
                //axisLabelWidth: 70
                highlightSeriesOpts: {
                    strokeWidth: 3,
                    strokeBorderWidth: 1,
                    highlightCircleSize: 5
                }
            }
        )
    );

    /*var seriesOptions = [];

    seriesOptions[0] = {
        name: "low",
        data: data1
    };
    seriesOptions[1] = {
        name: "high",
        data: data2
    };*/
    //createChart(seriesOptions);
}



function JsonToCSV2(JsonArray) {
    var JsonFields = Object.keys(JsonArray[0]);
    console.log(JsonFields)
    var csvStr = JsonFields.join(",") + "\n";

    JsonArray.forEach(element => {


        date = element.date,
            open = element.open,
            close = element.close
            //middle = element.middle

        csvStr += date + ',' + open + ',' + close + "\n";
    })


    return csvStr;
}

function createSecondGraph(json) {
    var clone = [];
    var mostrecentdate = json[0].date.slice(0, 10);
    for (key in json) {
        // copy each property into the clone
        if (json[key].date.includes(mostrecentdate)) {
            let temp = {
                date: json[key].date,
                open: json[key].open,
                close: json[key].close
            }
            clone.push(temp);

            /*let year = json[key].date.slice(0, 4)
            let month = json[key].date.slice(5, 7)
            let day = json[key].date.slice(8, 10)
            let hour = json[key].date.slice(11, 13)
            let minute = json[key].date.slice(14, 16)
            let sec = json[key].date.slice(17, )*/
            //console.log(year + month + day + " hour = " + hour + " min = " + minute + "sec = " + sec)
            //Date.parse(json[key].date.slice(0, 19))
            //clone.unshift([new Date(year, month, day, hour, minute, sec), json[key].open, json[key].close]);
        }
    }

    oneDayCSV_secondGraph = JsonToCSV2(clone);
    //oneDayCSV_secondGraph = clone;
    gs.push(
        new Dygraph(
            document.getElementById("div2"),
            oneDayCSV_secondGraph, {
                //labels: ["x", "open", "close"],
                rollPeriod: 14,
                showRoller: false,
                legend: 'always',
                colors: ["#5A5A5A", "#638CDD"],
                axisLineColor: "#d3d3d3",
                gridLineColor: "#d3d3d3",
                axes: {
                    x: {
                        drawGrid: false
                    },
                    y: {
                        axisLabelFormatter: function(v) {
                            return "$" + v; // controls formatting of the y-axis labels
                        }
                    }
                },
                axisLineWidth: 2.5,
                strokeWidth: 2,
                highlightSeriesOpts: {
                    strokeWidth: 3,
                    strokeBorderWidth: 1,
                    highlightCircleSize: 5
                }
            }
        )
    );
}

async function search() {
    var input = document.getElementById("searchform").value;
    console.log("searching for: " + input);
    //input = "aapl";
    if (input != null && input != "") {
        var search_url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=ISMWAHX9Y5PH9DLP`;
        var response = await fetch(search_url);
        var data2 = await response.json();
        var company_name = data2["bestMatches"][0]["2. name"];
        var company_symbol = data2["bestMatches"][0]["1. symbol"];
        console.log(company_name + " - " + company_symbol);


        const initializeGraph_url = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${company_symbol}`;
        const response2 = await fetch(initializeGraph_url);
        const data = await response2.json();

        var searchContainer = document.createElement('main');
        searchContainer.id = "main";
        searchContainer.className = "col px-4 mt-4 ml-3";
        searchContainer.style = "object-fit: contain";

        let title = document.createElement('h5');
        title.innerText = "Market Summary: " + company_name;

        let symbol = document.createElement('h6');
        symbol.innerText = "NASDAQ: " + company_symbol;

        let buttons = document.createElement('div');
        buttons.id = "timeInterval";

        let button1 = document.createElement('button');
        button1.onclick = function() { updategraphs(1); };
        button1.innerText = "1 day";

        let button2 = document.createElement('button');
        button2.onclick = function() { updategraphs(5); };
        button2.innerText = "1 week";

        let button3 = document.createElement('button');
        button3.onclick = function() { updategraphs(22); };
        button3.innerText = "1 month";

        let button4 = document.createElement('button');
        button4.onclick = function() { updategraphs(126); };
        button4.innerText = "6 months";

        let button5 = document.createElement('button');
        button5.onclick = function() { updategraphs(253); };
        button5.innerText = "1 year";

        let chartContainer = document.createElement("div");
        chartContainer.className = "chartContainer";

        let chart1 = document.createElement("div");
        chart1.id = "div1";
        chart1.className = "chart";

        let chart2 = document.createElement("div");
        chart2.id = "div2";
        chart2.className = "chart";

        let currentData = document.createElement("div");
        currentData.className = "container-fluid";
        currentData.style = "margin-top: 30px;";

        let dataRow = document.createElement("div");
        dataRow.className = "row";

        let column1 = document.createElement("div");
        column1.className = "column1 col";
        column1.innerHTML = "Low<br> High<br> Volume";

        let column2 = document.createElement("div");
        column2.className = "column2 col";
        column2.innerHTML = "293.5<br> 297.1<br> 76202093";

        let column3 = document.createElement("div");
        column3.className = "column3 col";
        column3.innerHTML = "Open<br> Close";

        let column4 = document.createElement("div");
        column4.className = "column4 col";
        column4.innerHTML = "293.5<br> 297.1";

        dataRow.appendChild(column1);
        dataRow.appendChild(column2);
        dataRow.appendChild(column3);
        dataRow.appendChild(column4);
        currentData.appendChild(dataRow);

        buttons.appendChild(button1);
        buttons.appendChild(button2);
        buttons.appendChild(button3);
        buttons.appendChild(button4);
        buttons.appendChild(button5);

        chartContainer.appendChild(chart1);
        chartContainer.appendChild(chart2);

        searchContainer.appendChild(title);
        searchContainer.appendChild(symbol);
        searchContainer.appendChild(buttons);
        searchContainer.appendChild(chartContainer);
        searchContainer.appendChild(currentData);

        document.getElementsByTagName("main")[0].replaceWith(searchContainer);

        createFirstGraph(data);
        createSecondGraph(data);
        var sync = Dygraph.synchronize(gs);
    }
}
//search();

async function updategraphs(days) {
    if (days == 1) {
        //console.log("INFO =  " + oneDayCSV_secondGraph);
        //console.log(gs);
        gs[0].updateOptions({
            'file': oneDayCSV_firstGraph
        });
        gs[1].updateOptions({
            'file': oneDayCSV_secondGraph
        });
    } else {
        var detail_url = `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?timeseries=${days}`;
        var response = await fetch(detail_url);
        var data = await response.json();
        //console.log(data.historical);

        var json = data.historical;

        var clone1 = [];

        for (key in json) {
            // copy each property into the clone
            var temp = {
                data: json[key].date,
                low: json[key].low,
                high: json[key].high,

            }
            clone1.push(temp);
            /*let year = json[key].date.slice(0, 4)
            let month = json[key].date.slice(5, 7)
            let day = json[key].date.slice(8, 10)

            //console.log(year + month + day + " hour = " + hour + " min = " + minute + "sec = " + sec)
            //Date.parse(json[key].date.slice(0, 19))
            clone1.unshift([new Date(year, month, day), json[key].low, json[key].high]);*/
        }
        //console.log(clone);


        var fields = Object.keys(clone1[0])
        var replacer = function(key, value) { return value === null ? '' : value }
        var csv = clone1.map(function(row) {
            return fields.map(function(fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })


        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');

        //console.log(csv2);
        /*gs[0].updateOptions({
            'file': clone1
        });*/

        gs[0] = new Dygraph(
            document.getElementById("div1"),
            csv, {
                //labels: ["x", "low", "high"],
                rollPeriod: 14,
                showRoller: false,
                legend: 'always',
                colors: ["rgba(178,34,34,.8)", "rgba(0,128,0,.8)"],
                axisLineColor: "#d3d3d3",
                gridLineColor: "#d3d3d3",
                axes: {
                    x: {
                        drawGrid: false,
                        valueParser: function(x) { return 1000 * parseInt(x); },
                    },
                    y: {
                        axisLabelFormatter: function(v) {
                            return "$" + v; // controls formatting of the y-axis labels
                        }
                    }
                },
                axisLineWidth: 2.5,
                strokeWidth: 2
                    //axisLabelWidth: 70
                    /*highlightSeriesOpts: {
                        strokeWidth: 3,
                        strokeBorderWidth: 1,
                        highlightCircleSize: 5
                    }*/
            }
        )

        var clone2 = [];
        for (key in json) {
            // copy each property into the clone
            var temp = {
                data: json[key].date,
                open: json[key].open,
                close: json[key].close,
            }
            clone2.push(temp);
            /*let year = json[key].date.slice(0, 4)
            let month = json[key].date.slice(5, 7)
            let day = json[key].date.slice(8, 10)

            //console.log(year + month + day + " hour = " + hour + " min = " + minute + "sec = " + sec)
            //Date.parse(json[key].date.slice(0, 19))
            clone2.unshift([new Date(year, month, day), json[key].low, json[key].high]);*/
        }
        //console.log(clone);


        fields = Object.keys(clone2[0])
        replacer = function(key, value) { return value === null ? '' : value }
        var csv2 = clone2.map(function(row) {
            return fields.map(function(fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })


        csv2.unshift(fields.join(',')) // add header column
        csv2 = csv2.join('\r\n');

        //console.log(csv2);
        /*gs[1].updateOptions({
            'file': clone2
        });*/
        //var sync = Dygraph.synchronize(gs);

        gs[1] = new Dygraph(
            document.getElementById("div2"),
            csv2, {
                //labels: ["x", "open", "close"],
                rollPeriod: 14,
                showRoller: false,
                legend: 'always',
                colors: ["#5A5A5A", "#638CDD"],
                axisLineColor: "#d3d3d3",
                gridLineColor: "#d3d3d3",
                axes: {
                    x: {
                        drawGrid: false
                    },
                    y: {
                        axisLabelFormatter: function(v) {
                            return "$" + v; // controls formatting of the y-axis labels
                        }
                    }
                },
                axisLineWidth: 2.5,
                strokeWidth: 2
                    /*highlightSeriesOpts: {
                        strokeWidth: 3,
                        strokeBorderWidth: 1,
                        highlightCircleSize: 5
                    }*/
            }
        )
        var sync = Dygraph.synchronize(gs);
    }
}
/*
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ]);

    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}*/
//var temp = document.getElementById("birdy");
/*
var temp = document.getElementsByTagName("template")[0];
var clon = temp.content.cloneNode(true);

function test() {
    //var temp = document.getElementById("birdy");
    document.getElementsByTagName("main").replaceWith(temp);
}

$(document).ready(function() {
    $('.bird-btn').click(function(e) {
        //Act on the event 
        //$('#birdy').css('display', 'initial');
        $('#searchResult').replaceWith(clon);
    });
});*/