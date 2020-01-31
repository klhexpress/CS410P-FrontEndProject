const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&outputsize=full&apikey=ISMWAHX9Y5PH9DLP";

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

async function test() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const response2 = await fetch(file);
    const data2 = await response2.text();
    console.log(data2);
}


test().catch(err => {
    console.log("error");
});