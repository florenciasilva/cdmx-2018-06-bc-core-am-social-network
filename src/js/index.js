// HTML Container for Sign Up and Sign In
let signInAndUpContainer = document.getElementById('sign-in-and-sign-up');
// HTML Container for News Feed
let newsFeedContainer = document.getElementById('news-feed');
// HTML Elements for Sign Up
let btnSignUp = document.getElementById('btnSignUp');
let userNickname = document.getElementById('icon_prefix');
let userEmail = document.getElementById('icon_email');
let userPassword = document.getElementById('icon_vpn_key');
// HTML Elements for Sign In
let btnSignIn = document.getElementById('btnSignIn');
let userEmailSignIn = document.getElementById('icon_email_sign_in');
let userPasswordSignIn = document.getElementById('icon_vpn_key_sign_in');
// HTML Elements for Comment Section
let btnSendComment = document.getElementById('btnSendComment');
let commentArea = document.getElementById('commentArea');
let printComment = document.getElementById('printMessage');
// Hiding non-necessary HTML Elements
newsFeedContainer.style.display = 'none';

// Button Events
// Register New User
btnSignUp.addEventListener('click', (ev) => {
  event.preventDefault(ev);
  let userNicknameValue = userNickname.value;
  // Hiding non-necessary HTML elements
  document.getElementById('userNickname').style.display = 'none';
  let userEmailValue = userEmail.value;
  let userPasswordValue = userPassword.value;
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue).catch(function(error) {
    // Show Errors
      var errorCode = error.code;
      var errorMessage = alert(error.message);
    });
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue);
// Storing Dynamic Data in Firebase Realtime Database
let signUpSection = document.getElementsByClassName('data-key-sign-up');
for (let i = 0; i < signUpSection.length; i++) {
  let key = signUpSection[i].getAttribute('data-key');
  let value = signUpSection[i].value;
  databaseObject.user[key] = value;
  //console.log(databaseObject.user.uid)
  let uid = firebase.auth().currentUser.uid;
  firebase.database().ref().child('user').push(uid)
  console.log(databaseObject);
  }
  

  const dbUserRef = firebase.database().ref();
  dbUserRef.push(databaseObject, () => {
    console.log('wooooooo');
  });
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
// Send Comment
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