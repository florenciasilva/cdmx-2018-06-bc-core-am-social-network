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
btnSignUp.addEventListener('click', (ev) => {
  event.preventDefault(ev);
  let userNicknameValue = userNickname.value;
  let userEmailValue = userEmail.value;
  let userPasswordValue = userPassword.value;
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userEmailValue, userPasswordValue);
});

btnSignIn.addEventListener('click', (ev) => {
  event.preventDefault(ev);
  let userEmailValueSignIn = userEmailSignIn.value;
  let userPasswordValueSignIn = userPasswordSignIn.value;
  firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn).then(function(success) {
    signInAndUpContainer.style.display = 'none';
    newsFeedContainer.style.display = 'block';
  }).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = alert(error.message);
  });
  firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
});

btnSendComment.addEventListener('click', (ev) => {
  event.preventDefault(ev);
  let getComment = commentArea.value;
  printComment.innerHTML = getComment;
});