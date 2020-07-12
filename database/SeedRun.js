const Chance = require('chance');
const fs = require('fs')
const { generateNumBetween, pickBiased} = require('./helpers.js');
const chance = new Chance();
const docs = [];
const idNumbers =[]
const languages = [
  'English',
  'Spanish',
  'Italian',
  'French',
  'Portuguese',
  'German',
  'Chinese',
  'Japanese',
  'Korean',
];

const countries = [
  'United States',
  'Spain',
  'Italy',
  'France',
  'Portugal',
  'Germany',
  'China',
  'Japan',
  'South Korea',
];

const regions = [
  ['Washington State', 'California', 'Oregon', 'Texas'],
  ['Andalucia', 'Aragon', 'Basque Country', 'Canary Islands'],
  ['Abruzzo', 'Calabria', 'Lazio', 'Marche'],
  ['Avignon', 'Bordeaux', 'Corse', 'Nouvelle-Aquitaine'],
  ['Aveiro', 'Beja', 'Braga', 'Lisbon'],
  ['Bavaria', 'Berlin', 'Brandenburg', 'Hesse'],
  ['Hubei', 'Hainan', 'Shanghai', 'Hunan'],
  ['Osaka', 'Kyoto', 'Tokyo', 'Okinawa'],
  ['Gangwon', 'North Jeolla', 'South Jeolla', 'Jeju'],
];

const commonWords = [
  'lovely',
  'clean',
  'beautiful',
  'pricey',
  'sunny',
  'warm',
  'beach',
  'pool',
  'hotel',
  'location',
];

const url=`https://sdcreviewsprofilepic.s3-us-west-2.amazonaws.com/profilepictures/img`

const weightedRatings = [4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1, 0];
const travelTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];
const years = [2016, 2017, 2018, 2019, 2020];

//call fs write stream
//give it the info and then call write
const writeUsers = fs.createWriteStream('ArangoTest.json');
writeUsers.write( 'location', 'utf8');
function writeTenMillionUsers(writer, encoding, callback) {
  let i = 100;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      //make you code here--------------------------------------------------
      const attractionId= id
      const attractionName = chance.city();

      const location={
        attractionId,
        attractionName,
        reviews:[],
      }
      const varNumReview = chance.integer({ min: 10, max: 20 });
  for(var j=0; j< varNumReview; j++){
    const year = chance.year({ min: 2015, max: 2020 });
    const expDate = chance.date({ year });
    const month = expDate.getMonth();
    const monthsAfter = generateNumBetween(0, 3);
    const createdAt = chance.date({ year, month: month + monthsAfter });
    const lang = pickBiased(languages);
    const langIndex = languages.indexOf(lang);
    const name = chance.name();
    const title = chance.sentence({ words: generateNumBetween(1, 4) });
    const rating = weightedRatings[generateNumBetween(0, weightedRatings.length - 1)];

    let body = chance.paragraph().split(' ');
    body.splice(3, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(5, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(8, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(12, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body = body.join(' ');

    location.reviews.push(
      review={
        rating,
      travelType: travelTypes[generateNumBetween(0, travelTypes.length - 1)],
      expDate,
      lang,
      body,
      title,
      votes: generateNumBetween(0, 1000),
      createdAt,
      helpful: false,
      user: {
        originCountry: countries[langIndex],
        originRegion: regions[langIndex][generateNumBetween(0, regions[langIndex].length - 1)],
        contributions: generateNumBetween(0, 1000),
        name,
        profileImage: `${url}${chance.integer({ min: 1, max: 1000 })}.jpg`,
      },
      }
    )
  }

      //-----------------------------------------------------------------------------
       const data = JSON.Stringify(location);
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}
writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});