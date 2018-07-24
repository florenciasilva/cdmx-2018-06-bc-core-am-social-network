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
  result += `<div class="card-action">
  <p id="printMessage">${getComment}</p>
  </div>`;
  document.getElementById('comments').innerHTML += result;
}); 