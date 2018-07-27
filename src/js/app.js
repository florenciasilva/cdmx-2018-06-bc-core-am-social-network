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

// Send Comment
btnSendComment.addEventListener('click', (ev) => {
    event.preventDefault(ev);
    // Obtaining User Input
    let result = '';
    let getComment = commentArea.value;
    result += `<div class="row">
    <div class="col s12 card-action">
  <p id="printMessage">${getComment}</p>
  </div>
  </div>`;
    document.getElementById('comments').innerHTML += result;
});

// Mobile SideNav
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});
var collapsibleElem = document.querySelector('.collapsible');
var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
