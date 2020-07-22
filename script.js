import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

// export let options = {
//   stages: [
//      { duration: '1s', target: 250},
//      { duration: '1s', target: 260},
//      { duration: '58s', target: 250},
//     //  { duration: '1s', target: 400},
//     //  { duration: '1s', target: 500},
//     //  { duration: '1s', target: 250},
//   ],
// };

// export default function () {
//   const BASE_URL = 'http://localhost:3004/';

//   for(var i =0; i<10;i++){
//     let res = http.get('http://localhost:3004/09000000/api/reviews');
//      check(res, { 'status was 200': r => r.status == 200 });
//      sleep(0.15);
//   }



  // let responses = http.batch([
  //   [
  //     'GET',
  //     `${BASE_URL}07000001/api/reviews`,
  //     null,
  //     { tags: { name: 'PublicCrocs' } },
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}07000000/api/reviews`,
  //     null,
  //     { tags: { name: 'PublicCrocs' } },
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}09000003/api/reviews`,
  //     null,
  //     { tags: { name: 'PublicCrocs' } },
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}09000000/api/reviews`,
  //     null,
  //     { tags: { name: 'PublicCrocs' } },
  //   ],
  // ]);
 //check(responses, { 'status was 200': r => r.status == 200 });


//}


// export let options = {
//   vus: 600,
//   duration: '60s'
// };

// export default function() {
//   const before = new Date().getTime();
//   const T = 6; // time needed to complete a VU iteration
//    const BASE_URL = 'http://localhost:3004/';
//   for(var i =0;i<10;i++){
//     let res = http.get('http://localhost:3004/09000000/api/reviews');
//     //let test1 = http.get('http://localhost:3004/09000000/api/reviews');
//     //check(res, { 'status was 200': r => r.status == 200 });
//     //sleep(0.25)
//   }
//     // let res = http.get('http://localhost:3004/09000000/api/reviews');
//     // check(res, { 'status was 200': r => r.status == 200 });
//     // let testTwo = http.get('http://localhost:3004/09100000/api/reviews');
//     // check(testTwo, { 'status was 200': r => r.status == 200 });
//     // let testThree = http.get('http://localhost:3004/09200000/api/reviews');
//     // check(testThree, { 'status was 200': r => r.status == 200 });
//     // let testfour = http.get('http://localhost:3004/09300000/api/reviews');
//     // check(testfour, { 'status was 200': r => r.status == 200 });
//     // let testfive = http.get('http://localhost:3004/09400000/api/reviews');
//     // check(testfive, { 'status was 200': r => r.status == 200 });
//     // let testsix = http.get('http://localhost:3004/09500000/api/reviews');
//     // check(testsix, { 'status was 200': r => r.status == 200 });
//     // let testseven = http.get('http://localhost:3004/09600000/api/reviews');
//     // check(testseven, { 'status was 200': r => r.status == 200 });
//     // let testeight = http.get('http://localhost:3004/09700000/api/reviews');
//     // check(testeight, { 'status was 200': r => r.status == 200 });
//     // let testNine = http.get('http://localhost:3004/09800000/api/reviews');
//     // check(testNine, { 'status was 200': r => r.status == 200 });
//     // let testTen = http.get('http://localhost:3004/09900000/api/reviews');
//     // check(testTen, { 'status was 200': r => r.status == 200 });
//     // let testEleven = http.get('http://localhost:3004/09940000/api/reviews');
//     // check(testEleven, { 'status was 200': r => r.status == 200 });
//     // let testTwelve = http.get('http://localhost:3004/09950000/api/reviews');
//     // check(testTwelve, { 'status was 200': r => r.status == 200 });
//     // let testThirteen = http.get('http://localhost:3004/09960000/api/reviews');
//     // check(testThirteen, { 'status was 200': r => r.status == 200 });
//     // let testFourteen = http.get('http://localhost:3004/09970000/api/reviews');
//     // check(testFourteen, { 'status was 200': r => r.status == 200 });


//     //sleep(0.25)

//   const after = new Date().getTime();
//   const diff = (after - before) / 1000;
//   const remainder = T - diff;
//   if (remainder > 0) {
//     sleep(remainder);
//   } else {
//     console.warn(
//       `Timer exhausted! The execution time of the test took longer than ${T} seconds`
//     );
//   }
// }
//=====================================new k6 documentation paul linked=================
export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 1000,  // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    }
  }
};

export default function() {
  http.get('http://localhost:3004/09000000/api/reviews');
}