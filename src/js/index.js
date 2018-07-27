// Button Events
document.getElementById('signIn').style.display = 'none';
document.getElementById('hide-sign-up').addEventListener('click', (ev) => {
    event.preventDefault(ev);
    console.log('wooo');
    document.getElementById('sign-up').style.display = 'none';
    document.getElementById('signIn').style.display = 'block';
});

// Register New User
btnSignUp.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    let userEmailValue = userEmail.value;
    let userPasswordValue = userPassword.value;
    // Creating user with Email and Password
    firebase.auth().createUserWithEmailAndPassword(userEmailValue, userPasswordValue).then(function(user) {
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
                reactions: 0,
                date: ''
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
});
// Sign In Event
btnSignIn.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    // Obtaining User Inputs
    let userEmailValueSignIn = userEmailSignIn.value;
    let userPasswordValueSignIn = userPasswordSignIn.value;
    // Sign In Firebase Function
    firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn).then(function(success) {
        // Managing HTML view
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
/*
const initApp = () => {
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
    });*/