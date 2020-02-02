async function search() {
  var input = document.getElementById("searchform").value;
  console.log("searching for: " + input);
  var search_url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=ISMWAHX9Y5PH9DLP`;
  var response = await fetch(search_url);
  var data = await response.json();
  var company_name = data["bestMatches"][0]["2. name"];
  console.log(company_name);

  var detail_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${input}&interval=60min&outputsize=compact&apikey=ISMWAHX9Y5PH9DLP`

  var text = "";
  text += company_name + "<br>";

  var x = await fetch(detail_url)
    .then((response) => response.json())
    .then((responseJSON) => {
      // do stuff with responseJSON here...
      console.log(responseJSON["Time Series (60min)"]);

      var obj = responseJSON["Time Series (60min)"];
      function walk(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            text += key + "    open: " + val["1. open"] + "    close: " + val["4. close"] + "<br>";
          }
        }
      }
      walk(obj);

    });

  document.getElementById("searchinfo").innerHTML = text;
}

/*test().catch(err => {
    console.log("error");
});*/

/*<!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
    <script src="../../assets/js/vendor/popper.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>

    <!-- Icons -->
    <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
    <script>
      feather.replace()
    </script>

    <!-- Graphs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
    <script>
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false,
          }
        }
      });
    </script>
    */