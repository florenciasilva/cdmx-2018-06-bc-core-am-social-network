// Prueba likes red social
// Initialize Firebase
// Set the configuration for your app


let config = {
  apiKey: 'AIzaSyA8JbvS1-HANdqa6CR5Qth8KFUmc1cDsig',
  authDomain: 'prueba-2-contador.firebaseapp.com',
  databaseURL: 'https://prueba-2-contador.firebaseio.com',
  projectId: 'prueba-2-contador',
  storageBucket: '',
  messagingSenderId: '436794642932'
};
firebase.initializeApp(config);

// functions/index.js

const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);
//
// let count = 0;
// firebase.database().red().on('value', function (snapshot){
//   console.log(snapshot.val());
//   count = snapshot.val().clicks;
//
// })
// counters/${ID} Testing cloud storage documentation. We use this to create a counter
// functions/income/counter.function.js
// // Create a ref with auto-generated ID
// let ref = db.collection('counters');

// // Add it in the batch
// ref.doc("SF").set({
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: true, population: 860000 });
//
//     ref.doc("HOLI").set({
//       shards: 0
//     });

// Get a new write batch

// // Set the value of 'NYC'
// var nycRef = db.collection("counters").doc("NYC");
// batch.set(nycRef, {name: "New York City"});
//
// // Update the population of 'SF'
// var sfRef = db.collection("counters").doc("SF");
// batch.update(sfRef, {"population": 1000000});
//
// // Delete the city 'LA'
// var laRef = db.collection("counters").doc('LA');
// // batch.delete(laRef);
// //
// // // Commit the batch
// // batch.commit().then(function () {
// //     // ...
// // });
// db.collection('counters').add({
//   user_like: 0,
// });

let countRef = db.collection('counters').doc(id);
document.getElementById('empathy-button').addEventListener('click', (ev) => {
  db.runTransaction(function(transaction) {
    return transaction.get(countRef)
      .then(function(countDoc) {
        if (!countDoc.exists) {
          throw 'Document doesnt exist';
        }
        let newCount = countDoc.data().user_like + 1;
        if (newCount === 1) {
          transaction.update(countRef, {user_like: newCount});
          return newCount;
        } else {
          return Promise.reject('Sorry');
        }
      });
  })
    .then(function(newCount) {
      console.log('like increased to', newCount);
    })
    .catch(function(err) {
      console.log(err);
    });
});
