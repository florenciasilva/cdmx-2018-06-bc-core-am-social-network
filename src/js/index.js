// HTML Elements
let btnSignUp = document.getElementById('btnSignUp');
let userNickname = document.getElementById('icon-prefix');
let userEmail = document.getElementById('icon-email');
let userPassword = document.getElementById('icon-vpn-key');


// Button Events
btnSignUp.addEventListener('click', () => {
    let userNicknameValue = userNickname.value;
    let userEmailValue = userEmail.value;
    let userPasswordValue = userPassword.value;
    auth.createUserWithEmailAndPassword(userEmailValue, userPasswordValue);
})
