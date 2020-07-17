//"{element,element2}"
const Chance = require('chance');
const { generateNumBetween, pickBiased} = require('./helpers.js');
const fs = require('fs');
const writeUsers = fs.createWriteStream('reviewstooooo.csv');
writeUsers.write('attractionId, attractionName, reviewNumber, rating, travelType, expDate, lang, body, title, votes, createdAt, helpful\n', 'utf8');
const chance = new Chance();

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 3;
  let id = 0;
  function write() {
    let ok = true;
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

    const weightedRatings = [4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1, 0];
    const travelTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];
    const years = [2016, 2017, 2018, 2019, 2020];
    do {
      i -= 1;
      id += 1;
      const LocId=`${id}`.padStart(8,'0')
      //====================data define=========================================
      //const attractionId= LocId
      //const attractionName = chance.city();
      //const reviews = [];
      const varNumReview = chance.integer({ min: 6, max: 12 });
      for(var j=0; j< varNumReview; j++){
        const attractionId= LocId
        const attractionName = chance.city();
        const reviewNumber= `${j}`.padStart(2,'0')
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
        const helpful=false;
        let body = chance.paragraph().split(' ');
        body.splice(3, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
        body.splice(5, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
        body.splice(8, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
        body.splice(12, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
        body = body.join(' ');
        const votes = generateNumBetween(0, 1000);
        const travelType=travelTypes[generateNumBetween(0, travelTypes.length - 1)]
        // going to have to change this to prevent brackets forming
        const data = `${attractionId}~${attractionName}~${reviewNumber}~${rating}~${travelType}~${expDate}~${lang}~${body}~${title}~${votes}~${createdAt}~${helpful}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }

      }

      //===========================data define==================================

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