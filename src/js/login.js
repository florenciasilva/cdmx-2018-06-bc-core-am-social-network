// Firebase config
let config = {
    apiKey: 'AIzaSyCDQFw022mnaArIkSeD7H-Q2V_zeoyX9YE',
    authDomain: 'meeus-87217.firebaseapp.com',
    databaseURL: 'https://meeus-87217.firebaseio.com/',
    projectId: 'meeus-87217',
    storageBucket: 'meeus-87217.appspot.com',
    messagingSenderId: '659264664694'
};
firebase.initializeApp(config);

// FirebaseUI config
let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    signInSuccessUrl: 'https://florenciasilva.github.io/cdmx-2018-06-bc-core-am-social-network/src/news-feed',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'https://policies.google.com/terms'
};