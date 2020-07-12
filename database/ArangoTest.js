var arangojs = require("arangojs");
const db = new arangojs.Database();
//const db = new Database();
const collection = db.collection("TripReview");


// db.query({
//   query: "RETURN @value",
//   bindVars: { value: now }
// })
//   .then(function(cursor) {
//     return cursor.next().then(function(result) {
//       // ...
//     });
//   })
//   .catch(function(err) {
//     console.log(err)
//   })