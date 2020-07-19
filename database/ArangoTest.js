const { Database, aql } = require("arangojs");
const db = new Database({
  url: "http://localhost:8529",
});
db.useDatabase("sdcReview");
db.useBasicAuth("root", "student");
const reviews = db.collection("newReview");


/*

you will need to implement the adding function here or in the server
let pad = "00000007"
let jey= "1178909"

let id = Number(pad) + Number(jey)
console.log(`${id}`)
*/

//===================================================
const id="6278910"
async function test(id) {
  let add = Number(id)
  let start = 1178909
   let newId= add + start
  const search =`newReview/${newId}`
  try{
    const cursor = await db.query(aql`
    RETURN DOCUMENT(${search})`)

    const result = cursor.next();
    console.log(result)
    return result
  }
  catch (err) {
       console.error(err.message)
     }

}
//test(id);

module.exports = test