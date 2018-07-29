// Code Snippets from Firebase Docs
let config = {
    apiKey: "AIzaSyCDQFw022mnaArIkSeD7H-Q2V_zeoyX9YE",
    authDomain: "meeus-87217.firebaseapp.com",
    databaseURL: "https://meeus-87217.firebaseio.com",
    projectId: "meeus-87217",
    storageBucket: "meeus-87217.appspot.com",
    // messagingSenderId: '659264664694'
};
firebase.initializeApp(config);
firebase.firestore();

let ui = new firebaseui.auth.AuthUI(firebase.auth());
let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            console.log(authResult);
            return true;
        },
        uiShown: function() {}
    },

    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../src/news-feed',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'

};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);