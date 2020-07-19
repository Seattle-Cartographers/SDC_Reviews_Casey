require('newrelic');
const { Database, aql } = require("arangojs");
const db = new Database({
  url: "http://localhost:8529",
});
db.useDatabase("sdcReview");
db.useBasicAuth("root", "student");
const reviews = db.collection("newReview");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { findForId, updateReview, updateImage } = require('./routeHandlers.js');

const port = 3004;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/:productId/reviewsModule', express.static(publicDir));

///:productId/reviewsModule
//


app.get('/:productId/api/reviews', (req,res) =>{
  let id= req.params.productId;
  console.log(id)
  async function test(id) {
    let add = Number(id)
    let start = 1178909
     let newId= add + start
    const search =`newReview/${newId}`
    try{
      const cursor = await db.query(aql`
      RETURN DOCUMENT(${search})`)


      const result = await cursor.next();
      console.log(result)


       res.send (result)
      // .then(function(result){
      //   res.status(200)
      //   res.send(result)
      // })
      // //res.send(result)

    }
    // .then(function(result){
    //   res.send(result)
    // })
    catch (err){
      res.status(404);
      res.send(err);
       }

  }

  test(id);
});

// app.patch('/:productId/api/reviews/:reviewId', updateReview);
// app.patch('/:productId/api/reviews/:reviewId/:imageId', updateImage);

app.listen(port, () => {
  console.log(`good to go on port ${port}`);
});
