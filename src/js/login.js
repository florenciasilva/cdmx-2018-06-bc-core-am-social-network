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
    signInSuccessUrl: '../news-feed',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'https://policies.google.com/terms'
};