const fs = require('fs');
const superagent = require('superagent');

// fs.readFile('./dog.txt', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     console.log(res.body);
//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       console.log('Image saved to file');
//     });
//   });
// });

// Notes:
// JavaScript Synchronously work karti hai isiliye jab hum order place karte hai amazon me tab vo hume promise deta hai ki samaan 3 din me
// deliver ho jaega aur jab vo pahuch jata hai humare address pr tab hume deliver ho jata hai.Issi tarah se promises work karte hai is promise
// resolve hota hai tab .then block execute hoga otherwise .catch wala block execute hoga
// Promises.then(res){
//Iss block ke andar ka code execute hoga;
//}
//promisces.end(err){
//Iss block ke andar ka code execute hoga;
//}

// same code by using promises:
fs.readFile('./dog.txt', (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Image saved to file');
      });
    })
    .catch((err) => {
      console.log('falied to save the image');
    });
});
