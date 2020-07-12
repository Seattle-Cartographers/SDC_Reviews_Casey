const Chance = require('chance');
const { generateNumBetween, pickBiased} = require('./helpers.js');
const fs = require('fs');
const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('id,originCountry,originRegion,contributions,name,profileImage,\n', 'utf8');
const chance = new Chance();

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 1000;
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

    const url=`https://sdcreviewsprofilepic.s3-us-west-2.amazonaws.com/profilepictures/img`

    const weightedRatings = [4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1, 0];
    const travelTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];
    const years = [2016, 2017, 2018, 2019, 2020];
    do {
      i -= 1;
      id += 1;
      const LocId=`${id}`.padStart(8,'0')
      //====================data define=========================================
      const lang = pickBiased(languages);
      const langIndex = languages.indexOf(lang);
      const originCountry = countries[langIndex];
      const originRegion = regions[langIndex][generateNumBetween(0, regions[langIndex].length - 1)];
      const contributions = generateNumBetween(0, 1000);
      const name = chance.name();
      const profileImage =`${url}${chance.integer({ min: 1, max: 1000 })}.jpg`;
      //===========================data define==================================
      const data = `${LocId},${originCountry},${originRegion},${contributions},${name},${profileImage}\n`;
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