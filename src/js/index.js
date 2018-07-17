// HTML Elements for Sign Up
let btnSignUp = document.getElementById('btnSignUp');
let userNickname = document.getElementById('icon_prefix');
let userEmail = document.getElementById('icon_email');
let userPassword = document.getElementById('icon_vpn_key');
// HTML Elements for Sign In
let btnSignIn = document.getElementById('btnSignIn');
let userEmailSignIn = document.getElementById('icon_email_sign_in');
let userPasswordSignIn = document.getElementById('icon_vpn_key_sign_in');


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
  admin.auth().getUser(uid).then(function(userRecord) {
    console.log(userRecord);
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON());
  })
    .catch(function(error) {
      console.log('Error fetching user data:', error);
    });
  // firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn).catch(function(error) {
  // let errorCode = error.code;
  // let errorMessage = error.message;
  // });
  // firebase.auth().signInWithEmailAndPassword(userEmailValueSignIn, userPasswordValueSignIn);
});

// Button Events
btnSignUp.addEventListener('click', () => {
    let userNicknameValue = userNickname.value;
    let userEmailValue = userEmail.value;
    let userPasswordValue = userPassword.value;
    auth.createUserWithEmailAndPassword(userEmailValue, userPasswordValue);
})
