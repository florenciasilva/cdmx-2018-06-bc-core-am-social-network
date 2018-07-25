document.getElementById('signIn').style.display = 'none';
document.getElementById('hide-sign-up').addEventListener('click', (ev) => {
    event.preventDefault(ev);
    console.log('wooo');
    document.getElementById('sign-up').style.display = 'none';
    document.getElementById('signIn').style.display = 'block';
});

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
// Button Events

// Register New User
btnSignUp.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    let userEmailValue = userEmail.value;
    let userPasswordValue = userPassword.value;
    // Creating user with Email and Password
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue).then(function() {
        window.location.assign('../src/news-feed.html');

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = alert(error.message);
    });
    // Storing Dynamic Data in Firebase Realtime Database
    let databaseObject = {
        user: {
            nickname: '',
            email: '',
            uid: '',
            profileImg: '',
            posts: {
                msg: '',
                img: '',
                likes: 0,
                timeStamp: 0,
            }
        }
    };
    let signUpSection = document.getElementsByClassName('data-key-sign-up');
    for (let i = 0; i < signUpSection.length; i++) {
        let key = signUpSection[i].getAttribute('data-key');
        let value = signUpSection[i].value;
        databaseObject.user[key] = value;
        console.log(databaseObject);
    }
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue);
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
        success.location.assign = 'https://florenciasilva.github.io/cdmx-2018-06-bc-core-am-social-network/src/news-feed';
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = alert(error.message);
    });
    firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
});

// Log in with facebook, we get this code from the site of facebook for developers
/* let provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  let token = result.credential.accessToken;
  // The signed-in user info.
  let user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  // ...
  return provider;
  console.log(provider);
});

// sign out
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
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
        let provider = new firebase.auth.GoogleAuthProvider();
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

          firebase.auth().signInWithPopup(provider);
});

// btnSignOut.addEventListener('click', () => {

// });
*/