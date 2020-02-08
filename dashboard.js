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

async function extractNews() {
    var url = "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=100&apiKey=69c05c3e9def4e2aaee0d739b28ee3f1";

    var cardContainer = document.getElementById('newsCards');
    var response = await fetch(url)
        .then((response) => response.json())
        .then((responseJSON) => {
            //console.log(responseJSON);
            var total = responseJSON.totalResults;
            //console.log(total);
            var obj = responseJSON["articles"];
            console.log(obj);
            for (i = 0; i < total; i++) {

                let hyperlinkCard = document.createElement('a');
                hyperlinkCard.href = obj[i].url;

                let card = document.createElement('div');
                card.className = 'card shadow';

                if (obj[i].urlToImage) {
                    let cardpic = document.createElement("img");
                    cardpic.className = "mb-n5 card-img-top";
                    cardpic.src = obj[i].urlToImage;
                    card.appendChild(cardpic);
                }

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let title = document.createElement('h5');
                title.className = "card-title";
                title.innerText = obj[i].title;

                let subtitle = document.createElement("h6");
                subtitle.className = "card-subtitle text-muted";
                subtitle.innerText = (obj[i].author ? obj[i].author : "") + " " + obj[i].publishedAt.slice(0, 10);

                let description = document.createElement('p');
                description.className = "card-text text-muted";
                description.innerText = obj[i].description;

                card.appendChild(cardBody);
                card.appendChild(title);
                card.appendChild(subtitle);
                card.appendChild(description);
                hyperlinkCard.appendChild(card)
                cardContainer.appendChild(hyperlinkCard);
            }
        });
}


/*test().catch(err => {
    console.log("error");
});*/

/*<!-- 
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