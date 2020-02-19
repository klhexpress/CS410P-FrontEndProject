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
                hyperlinkCard.target = "_blank";

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


function signin() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    /*ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Other config options...
    });*/


    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'index.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        //tosUrl: '<your-tos-url>',
        // Privacy policy url.
        //privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    ui.start('#firebaseui-auth-container', uiConfig);

}

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById("signinBtn").innerText = displayName;
            //console.log(displayName + "\t" + email);
        } else {

            // User is signed out.
            // ...
        }
    });

}

function handleSignInBtnClick() {
    console.log("in here");
    var signInBtn = document.getElementById('signinBtn');
    //firebase.auth().onAuthStateChanged(function(user) {
    firebase.auth().onAuthStateChanged(function(user) {
        //console.log(user);
        if (user) {
            // User is signed in.
            console.log("in if stmt");

            let dropdownMenu = document.createElement("div");
            dropdownMenu.className = "dropdown-menu dropdown-menu-right";

            let firstDropdownItem = document.createElement('button');
            firstDropdownItem.className = "dropdown-item";
            firstDropdownItem.type = "button";
            firstDropdownItem.innerText = "WatchList";

            let secondDropdownItem = document.createElement('button');
            secondDropdownItem.className = "dropdown-item";
            secondDropdownItem.type = "button";
            secondDropdownItem.onclick = function() {
                console.log("in logout()");
                firebase.auth().signOut().then(function() {
                    location.reload();
                }).catch(function(error) {
                    // An error happened.
                });
                return false;
            }
            secondDropdownItem.innerText = "Log out";

            dropdownMenu.appendChild(firstDropdownItem);
            dropdownMenu.appendChild(secondDropdownItem);
            signInBtn.appendChild(dropdownMenu);

        } else {
            // No user is signed in.
            let dropdownMenu = document.createElement("div");
            dropdownMenu.className = "dropdown-menu dropdown-menu-right";

            let firstItem = document.createElement('button');
            firstItem.id = "firebaseui-auth-container";

            let secondItem = document.createElement('button');
            secondItem.id = "loader";
            secondItem.innerText = "Loading...";

            dropdownMenu.appendChild(firstItem);
            dropdownMenu.appendChild(secondItem);
            signInBtn.appendChild(dropdownMenu);
            signin();
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