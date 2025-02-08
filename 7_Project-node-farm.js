const fs = require('fs');
const url = require('url');
const http = require('http');
const slugify = require('slugify');

// our imported module
const repalceTemplate = require('./modules/replaceTemplate');

// synchronous function
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./data.json', 'utf-8');
const dataOBj = JSON.parse(data);
// NOW DATAOBJ HOLDS  all the data from data.json

// slugs for the url
const slugs = dataOBj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// function for the card renderin
// const repalceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   output = output.replace(
//     /{%NOT_ORGANIC%}/g,
//     !product.organic ? "not-organic" : ""
//   );

//   return output;
// };
// we can also import it by using export module just like another module

// api call back function
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardshtml = dataOBj.map((product) => repalceTemplate(tempCard, product));
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml);
    res.end(output);
  }

  //products
  else if (pathname == '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataOBj[query.id];
    const output = repalceTemplate(tempProduct, product);
    res.end(output);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listing on the port 8000');
});
