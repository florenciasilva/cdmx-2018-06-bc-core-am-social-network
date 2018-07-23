// HTML Container for Sign Up and Sign In
let signInAndUpContainer = document.getElementById('sign-in-and-sign-up');
// HTML Container for News Feed
let newsFeedContainer = document.getElementById('news-feed');
// HTML Elements for Sign Up
let btnSignUp = document.getElementById('btnSignUp');
let userNickname = document.getElementById('icon_prefix');
let userEmail = document.getElementById('icon_email');
let userPassword = document.getElementById('icon_vpn_key');
// HTML Elements for Sign In/Out
let btnSignIn = document.getElementById('btnSignIn');
let userEmailSignIn = document.getElementById('icon_email_sign_in');
let userPasswordSignIn = document.getElementById('icon_vpn_key_sign_in');
let btnSignInGoogle = document.getElementById('btn_sign_in_google');
let btnSignOut = document.getElementById('btn_sign_out');
// HTML Elements for Comment Section
let btnSendComment = document.getElementById('btnSendComment');
let commentArea = document.getElementById('commentArea');
let printComment = document.getElementById('printMessage');
// Hiding non-necessary HTML Elements
// newsFeedContainer.style.display = 'none';

// Button Events
// Register New User
btnSignUp.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    let userNicknameValue = userNickname.value;
    // Hiding non-necessary HTML elements
    document.getElementById('userNickname').style.display = 'none';
    let userEmailValue = userEmail.value;
    let userPasswordValue = userPassword.value;
    // Creating user with Email and Password
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = alert(error.message);
    });
    // Storing Dynamic Data in Firebase Realtime Database
    let signUpSection = document.getElementsByClassName('data-key-sign-up');
    for (let i = 0; i < signUpSection.length; i++) {
        let key = signUpSection[i].getAttribute('data-key');
        let value = signUpSection[i].value;
        databaseObject.user[key] = value;
        // console.log(databaseObject.user.uid)
        // let uid = firebase.auth().currentUser.uid;
        // firebase.database().ref().child('user').push(uid)
        console.log(databaseObject);
    }
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue);
    // const dbUserRef = firebase.database().ref();
    // dbUserRef.push(databaseObject, () => {
    //    console.log('wooooooo');
});

// Sign In Event
btnSignIn.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    // Obtaining User Inputs
    let userEmailValueSignIn = userEmailSignIn.value;
    let userPasswordValueSignIn = userPasswordSignIn.value;
    // Sign In Firebase Function
    firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn).then(function(success) {
        // Managin HTML view
        signInAndUpContainer.style.display = 'none';
        newsFeedContainer.style.display = 'block';
        document.getElementById('userNickname').style.display = 'block';
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = alert(error.message);
    });
    firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
});

// Google Sign In
btnSignInGoogle.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    // Sign In with Google (Code Snippet from Firebase Documentation)
    // Initialize the FirebaseUI Widget using Firebase.
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                let displayName = user.displayName;
                let email = user.email;
                let emailVerified = user.emailVerified;
                let photoURL = user.photoURL;
                let uid = user.uid;
                let phoneNumber = user.phoneNumber;
                let providerData = user.providerData;
                user.getIdToken().then(function(accessToken) {
                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function(error) {
            console.log(error);
        });
    };

    window.addEventListener('load', function() {
        initApp();
    });
    /*    let provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider).then(function(result) {
              console.log(provider);
              // This gives you a Google Access Token. You can use it to access the Google API.
              let token = result.credential.accessToken;
              // The signed-in user info.
              let user = result.user;
          }).catch(function(error) {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              // The email of the user's account used.
              let email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              let credential = error.credential;
          });

          firebase.auth().signInWithPopup(provider);*/
});

// btnSignOut.addEventListener('click', () => {

// });

// Send Comment
/* btnSendComment.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    // Obtaining User Input
    let result = '';
    let getComment = commentArea.value;
    result += `<div class="card-action">
    <p id="printMessage">${getComment}</p>
    </div>`;
    document.getElementById('comments').innerHTML += result;
});*/