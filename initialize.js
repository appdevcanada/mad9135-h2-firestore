
var db = firebase.firestore();
var cat = db.collection("categories");

// cat.doc("books").set({ titles: ["Holy Bible", "Robert's React", "Steve's Javascript"] });

// cat.doc("movies").set({ titles: ["The Passion of Christ", "Monty Python", "Life of Brian"] });

// cat.doc("musics").set({ titles: ["I Surrender", "Shape of You", "Perfect"] });

// cat.get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id}`);
//   })
// })