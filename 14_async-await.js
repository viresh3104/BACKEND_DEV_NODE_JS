const { get } = require('express/lib/response');
const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./dog.txt', (err, data) => {
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dog-img.txt', data, (err) => {
      resolve('Success');
    });
  });
};

// const getdog = async () => {
//   const data = await readFilePro('./dog.txt');

//   const res = await superagent(`https://dog.ceo/api/breed/${data}/images/random`);

//   await writeFilePro('./dog-img.txt', res.body.message);
//   console.log('image saved successfully');
// };

// waiting for multiple promises
const getdog = async () => {
  const data = await readFilePro('./dog.txt');

  const res1Pro = superagent(`https://dog.ceo/api/breed/${data}/images/random`);
  const res2Pro = superagent(`https://dog.ceo/api/breed/${data}/images/random`);
  const res3Pro = superagent(`https://dog.ceo/api/breed/${data}/images/random`);

  const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
  //   now map the images in the body
  const images = all.map((res) => res.body.message);
  console.log(images);

  await writeFilePro('./dog-img.txt', images.join('\n'));
  console.log('image saved successfully');
};

getdog();
