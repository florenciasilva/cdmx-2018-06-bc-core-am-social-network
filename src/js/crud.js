// console.log("hola!");

firebase.initializeApp({
  apiKey: 'AIzaSyCDQFw022mnaArIkSeD7H-Q2V_zeoyX9YE',
  authDomain: 'meeus-87217.firebaseapp.com',
  projectId: 'meeus-87217'
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// agregando documentos
const guardar = () => {
  // Declaramos una var que guarde el value del TextArea
  const postFromUser = document.getElementById('commentArea').value;

  db.collection('publicaciones').add({
    post: postFromUser,
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
const cardDeComentario = document.getElementById('strfromuser');

db.collection('publicaciones').onSnapshot((querySnapshot) => {
  cardDeComentario.innerHTML = '';

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().post}`);
    cardDeComentario.innerHTML += `<div class="row">
                                        <div class="col s12 m10">
                                          <div class="card white darken-1">
                                            <div class="card-content black-text">
                                              <span class="card-title"></span>
                                              <p>ID del post: ${doc.id}</p>
                                              <p>${doc.data().post}</p>
                                              <a class="waves-effect waves-light btn-small" onclick="eliminar('${doc.id}')">BORAR POST</a>
                                              <a class="waves-effect waves-light btn-small" onclick="editar('${doc.id}', '${doc.data().post}')">EDITAR POST</a>


                                            </div>

                                          </div>
                                        </div>
                                      </div>`;
  });
});


// Borando post del usuario
function eliminar(id) {
  db.collection('publicaciones').doc(id).delete().then(function() {
    console.log('Document successfully deleted!');
  }).catch(function(error) {
    console.error('Error removing document: ', error);
  });
}

// Editando Post de Usuario.

function editar(id, postFromUser) {
  document.getElementById('commentArea').value = postFromUser;
  let botonEditar = document.getElementById('btnSendComment');
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
