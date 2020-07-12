const fs = require('fs');
const path = require('path');
const axios = require('axios');

const uploadImgDir = path.resolve(__dirname, '..', 'images', 'uploads');

//had to increment by 100 need to redo to make fs more dynamic
for (let i = 900; i < 1001; i += 1) {
  axios({
    url: 'https://picsum.photos/100',
    method: 'get',
    responseType: 'stream',
  })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(`${uploadImgDir}/img${i}.jpg`));
    })
    .catch((err) => {
      console.error('axios error ', err);
    });
}