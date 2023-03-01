//Khoi Nguyen's Code

async function extractNews() {
    var url = "http://api.mediastack.com/v1/news?access_key=fa2b4127a6212915b770b9c70a29876a&categories=technology&countries=us";

    var cardContainer = document.getElementById('newsCards');
    var response = await fetch(url)
        .then((response) => response.json())
        .then((responseJSON) => {

            var total = responseJSON["pagination"]["count"];
            console.log(total);
            var obj = responseJSON["data"];
            for (i = 0; i < total; i++) {

                let hyperlinkCard = document.createElement('a');
                hyperlinkCard.href = obj[i]["url"];
                hyperlinkCard.target = "_blank";

                let card = document.createElement('div');
                card.className = 'card shadow';

                if (obj[i]["image"]) {
                    let cardpic = document.createElement("img");
                    cardpic.className = "mb-n5 card-img-top";
                    cardpic.src = obj[i]["image"];
                    card.appendChild(cardpic);
                }

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let title = document.createElement('h5');
                title.className = "card-title";
                title.innerText = obj[i]["title"];

                let subtitle = document.createElement("h6");
                subtitle.className = "card-subtitle text-muted";
                //subtitle.innerText = (obj[i]["author"] ? obj[i]["author"] : "") + " " + obj[i]["publishedAt"].slice(0, 10);

                let description = document.createElement('p');
                description.className = "card-text text-muted";
                description.innerText = obj[i]["description"];

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
