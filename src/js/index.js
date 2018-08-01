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
        likes: {
          numShards: '',
          shards: [],
          count: 0,
        },
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
    window.location.assign('../src/news-feed.html');
  }).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = alert(error.message);
  });
  firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
});
