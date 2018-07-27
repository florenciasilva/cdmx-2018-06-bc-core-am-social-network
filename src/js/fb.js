// Prueba likes red social
// Initialize Firebase
// Set the configuration for your app
var config = {
  apiKey: 'AIzaSyDr2vMSMnHcs2_uW-XCfA6yElseoW9py5M',
  authDomain: 'pruebas-contador.firebaseapp.com',
  databaseURL: 'https://pruebas-contador.firebaseio.com',
  storageBucket: 'pruebas-contador.appspot.com'
};
firebase.initializeApp(config);

// // counters/${ID}
// {
//   "numShards": NUM_SHARDS,
//   "shards": [subcollection]
// }

// // counters/${ID}/shards/${NUM}
// {
//   "count": 123
// }

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
