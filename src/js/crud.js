let config = {
  apiKey: 'AIzaSyCDQFw022mnaArIkSeD7H-Q2V_zeoyX9YE',
  authDomain: 'meeus-87217.firebaseapp.com',
  databaseURL: 'https://meeus-87217.firebaseio.com/',
  projectId: 'meeus-87217',
  storageBucket: 'meeus-87217.appspot.com',
  messagingSenderId: '659264664694'
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//agregando documentos
let imgUploaded = document.getElementById('img-upload');
let progress = document.getElementById('uploader');


imgUploaded.addEventListener('change', (ev) => {
  let file = ev.target.files[0];
  let storageRef = firebase.storage().ref('user/' + file.name);
  let task = storageRef.put(file);
  task.on('state_changed',
    function progress(snapshot) {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
      progress.value = percentage;
    },
    function error(err) {

    },
    function complete() {
    }
  );
});
const guardar = () => {
  //Declaramos una var que guarde el value del TextArea
  const postFromUser = document.getElementById("commentArea").value;

  db.collection("publicaciones").add({
      post: postFromUser
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      //Esto hace que la TextArea se reinicie una vez dado click en "SEND"
      //document.getElementById("postFromUser").value = "";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

//Pintando post del usuario
const cardDeComentario = document.getElementById("strfromuser");

db.collection("publicaciones").onSnapshot((querySnapshot) => {
  cardDeComentario.innerHTML = "";

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
                                      </div>`
  });
});


//Borando post del usuario
function eliminar(id) {
  db.collection("publicaciones").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

//Editando Post de Usuario.



function editar(id, postFromUser) {

  document.getElementById("commentArea").value = postFromUser;
  let botonEditar = document.getElementById("btnSendComment");
  botonEditar.innerHTML = "EDITAR";

  botonEditar.onclick = function () {
    let washingtonRef = db.collection("publicaciones").doc(id);
    // Set the "capital" field of the city 'DC'

    let postFromUser = document.getElementById("commentArea").value;

    return washingtonRef.update({
        post: postFromUser
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

  }
}