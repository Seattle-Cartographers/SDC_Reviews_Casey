require('newrelic');
const { Database, aql } = require("arangojs");
const db = new Database({
  url:"http://ec2-34-211-46-15.us-west-2.compute.amazonaws.com:8529"
  //url: "http://localhost:8529",
});
//db.useDatabase("");
db.useBasicAuth("root", "JellyFilledDonut13");
const reviews = db.collection("finalReview");


const express = require('express');
//const morgan = require('morgan');
//const bodyParser = require('body-parser');
const path = require('path');
//const { findForId, updateReview, updateImage } = require('./routeHandlers.js');

const port = 3004;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

const app = express();

//app.use(bodyParser.json());

app.use('/:productId/reviewsModule', express.static(publicDir));

app.get('/:productId/api/reviews', (req,res) =>{
  //res.sendStatus(200);
  let id= Number(req.params.productId) + 1178909;
  (async () => {
    const search =`finalReview/${id}`
    try{
      const cursor = await db.query(aql`
      RETURN DOCUMENT(${search})`)
      const result = await cursor.next();
       res.send (result)
    }
    catch (err){
      res.status(404);
      res.send(err);
       }
  })();
});

// app.patch('/:productId/api/reviews/:reviewId', updateReview);
// app.patch('/:productId/api/reviews/:reviewId/:imageId', updateImage);

app.listen(port, () => {
  console.log(`good to go on port ${port}`);
});
