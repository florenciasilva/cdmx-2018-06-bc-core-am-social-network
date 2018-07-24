window.signIn = () => {
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
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = alert(error.message);
        });
        firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
    });
}

window.signUp = () => {
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
        }
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue);
    });
}

window.signOut = () => {

};

window.googleSignIn = () => {
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
    });
}

window.sendComment = () => {
    btnSendComment.addEventListener('click', (ev) => {
        event.preventDefault(ev);
        // Obtaining User Input
        let result = '';
        let getComment = commentArea.value;
        result += `<div class="card-action">
    <p id="printMessage">${getComment}</p>
    </div>`;
        document.getElementById('comments').innerHTML += result;
    });

}

window.organize = () => {
    if (window.signIn || window.signUp || window.googleSignIn) {
        window.location.href = 'https://florenciasilva.github.io/cdmx-2018-06-bc-core-am-social-network/src/news-feed';
    } else {
        window.signOut;
    }
}