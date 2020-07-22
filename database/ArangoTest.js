const { Database, aql } = require("arangojs");
const db = new Database({
  url: "http://localhost:8529",
});
db.useDatabase("sdcReview");
db.useBasicAuth("root", "student");
const reviews = db.collection("newReview");


exports = db;