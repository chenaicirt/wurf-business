const firebase = require("firebase");
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCiMuINxaok3OuBoaVN8h4Fu6ioa72MvUM",
  authDomain: "wurf-82264.firebaseapp.com",
  databaseURL: "https://wurf-82264.firebaseio.com",
  projectId: "wurf-82264",
  storageBucket: "wurf-82264.appspot.com",
  messagingSenderId: "573969861553"
};
firebase.initializeApp(config);
var db = firebase.firestore();


const menu = require("./nyxmascara.json");

menu.forEach(function(obj) {
    db.collection("Mascara").add({
        id: obj.id,
        brand: obj.brand,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        image_link: obj.image_link,
        product_type: "mascara",
        num_of_comparisons: 0,
        num_passees: 0,
        num_wins: 0,
        num_losses: 0,
        elo_rating: 1500
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
