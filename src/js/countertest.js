// Prueba likes red social
// Initialize Firebase
// Set the configuration for your app
let config = {
    apiKey: "AIzaSyA8JbvS1-HANdqa6CR5Qth8KFUmc1cDsig",
    authDomain: "prueba-2-contador.firebaseapp.com",
    databaseURL: "https://prueba-2-contador.firebaseio.com",
    projectId: "prueba-2-contador",
    storageBucket: "",
    messagingSenderId: "436794642932"
  };
firebase.initializeApp(config);

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

db.collection('Posts').add({
  'numShards': 0,
  'shards': [{
    // counters/${ID}/shards/${NUM}
    'count': 0
  },

  ]});

const createCounter = (ref, numShards) => {
  let batch = db.batch();

  // Initialize the counter document
  batch.set(ref, { numShards: numShards });

  // Initialize each shard with count=0
  for (let i = 0; i < numShards; i++) {
    let shardRef = ref.collection('shards').doc(i.toString());
    batch.set(shardRef, { count: 0 });
  }

  // Commit the write batch
  return batch.commit();
};

const incrementCounter = (db, ref, numShards) => {
  // Select a shard of the counter at random
  const shardId = Math.floor(Math.random() * numShards).toString();
  const shardRef = ref.collection('shards').doc(shard_id);

  // Update count in a transaction
  return db.runTransaction(tra => {
    return tra.get(shard_ref).then(doc => {
      const newCount = doc.data().count + 1;
      tra.update(shard_ref, { count: newCount });
    });
  });
};

const getCount = (ref) => {
  // Sum the count of each shard in the subcollection
  return ref.collection('shards').get().then(snapshot => {
    let totalCount = 0;
    snapshot.forEach(doc => {
      totalCount += doc.data().count;
    });

    return totalCount;
  });
};
