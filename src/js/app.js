// Sign Out Event
btnSignOut.addEventListener('click', (ev) => {
  event.preventDefault(ev);
  firebase.auth().signOut().then(function() {
    window.location.assign('../src/index.html');
  }).catch(function(error) {
    let errorMsg = alert(error.message);
  });
  firebase.auth().signOut();
});

// Mobile SideNav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
var collapsibleElem = document.querySelector('.collapsible');
var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Img Upload

// HTML Elements for uploading images
//let sendImg = document.getElementById('btn-send-img');
