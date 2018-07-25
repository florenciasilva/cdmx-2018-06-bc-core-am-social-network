// HTML Elements for Comment Section
let btnSendComment = document.getElementById('btnSendComment');
let commentArea = document.getElementById('commentArea');
let printComment = document.getElementById('printMessage');

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