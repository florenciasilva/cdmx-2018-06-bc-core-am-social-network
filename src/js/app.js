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

// Send, Edit and Delete Comments
const db = firebase.firestore();
window.createUser = () => {
  // Declaramos una var que guarde el value del TextArea
  let postFromUser = document.getElementById('commentArea').value;
  db.collection('publicaciones').add({
    post: postFromUser,
    date: Date(postFromUser),
    user_like: 0,

  })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      // Esto hace que la TextArea se reinicie una vez dado click en "SEND"
      // document.getElementById("postFromUser").value = "";
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};
// Pintando post del usuario
db.collection('publicaciones').onSnapshot((querySnapshot) => {
  cardDeComentario.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().post}`);
    console.log(doc);
    cardDeComentario.innerHTML += `
                                        <div class="card white darken-1">
                                          <div class="card-content black-text col s10 m8 l9">
                                          <div class="row">
                                      <div class="col s8 m9 l9">
                                            <span class="card-title generated">user said:</span>
                                            <p class="user-comment">${doc.data().post}</p>
                                            <p class="comment-date right">${doc.data().date.slice(0, 21)}</p>
                                            <div class="center">
                                            <a class="waves-effect waves-light btn-small color-change created" onclick="deletePost('${doc.id}')"><i class="far fa-trash-alt"></i></a>
                                            <a class="waves-effect waves-light btn-small color-change created" onclick="edit('${doc.id}', '${doc.data().post}')"><i class="far fa-edit"></i>
                                            <a class="waves-effect waves-light btn-small" onclick="feelU('${doc.id}')"><i class="material-icons left">favorite</i>Feel U</a>
                                            </a>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                    `;
  });
});
// Borando post del usuario
window.deletePost = (id) => {
  db.collection('publicaciones').doc(id).delete().then(function() {
    console.log('Document successfully deleted!');
  }).catch(function(error) {
    console.error('Error removing document: ', error);
  });
}
// Editando Post de Usuario.
window.edit = (id, postFromUser) => {
  document.getElementById('commentArea').value = postFromUser;
  let botonEditar = btnSendComment;
  botonEditar.innerHTML = 'EDITAR';
  botonEditar.onclick = function() {
    let washingtonRef = db.collection('publicaciones').doc(id);
    // Set the "capital" field of the city 'DC'
    let postFromUser = document.getElementById('commentArea').value;
    return washingtonRef.update({
      post: postFromUser
    })
      .then(function() {
        console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
};

//Get Likes
window.feelU = (id) => {
    let countRef = db.collection('publicaciones').doc(id);
    db.runTransaction((transaction) => {
      return transaction.get(countRef)
        .then((countDoc) => {
          if (!countDoc.exists) {
            throw 'Document doesnt exist';
          }
          let newCount = countDoc.data().user_like + 1;
          if (newCount >= 0) {
            transaction.update(countRef, {user_like: newCount});
            return newCount;
          } else {
            return Promise.reject('Sorry');
          }
        });
    })
      .then((newCount) => {
        console.log('like increased to', newCount);
      })
      .catch((err) => {
        console.log(err);
      });
}


// Mobile Sidenav
document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems);
});
let collapsibleElem = document.querySelector('.collapsible');
let collapsibleInstance = M.Collapsible.init(collapsibleElem);

// IMG Uploader
let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(ev) {
  // Get file
  let file = ev.target.files[0];
  // Storage ref
  let storageRef = firebase.storage().ref('user/' + file.name);
  // Upload file
  let uploadTask = storageRef.put(file);
  let storage = firebase.storage().ref();
  // Update progress
  uploadTask.on('state_changed',
    progress = (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
      console.log(uploader.value);
      let snap = snapshot;
      return snap;
      // console.log(snapshot);
    },
    error = (err) => {
    },
    success = () => {
      const getImgUrl = function() {
        storage.child('user/' + file.name).getDownloadURL().then(function(url) {
          return url;
        }).catch(function(error) {
          // Handle any errors here
        });
      };
     getImgUrl();

    }
  );
});
