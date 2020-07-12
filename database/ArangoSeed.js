const Chance = require('chance');
const { generateNumBetween, pickBiased} = require('./helpers.js');
// from my understanding arango accepts json arguments and its schema is defined as any javascript object
const chance = new Chance();
//readable stream from scratch and make drain event handle it from pipe to make a writeable stream


//first make a small sample of data to make sure it works with arango
const docs = [];
const idNumbers =[]
for (i = 0; i < 1000; i++) {
 idNumbers.push(`${i}`.padStart(4,'0'));
}

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

const docs = [];
const idNumbers =[]
for (i = 0; i < 1000; i++) {
 idNumbers.push(`${i}`.padStart(4,'0'));
}
idNumbers.forEach((num)=>{

  const attractionId= num
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
})


//__key

//essentialy model the json object the same as seed.js
