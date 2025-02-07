const http = require("http");
const url = require("url");
const fs = require("fs");

//call back function of the server
const server = http.createServer((req, res) => {
  const pathName = req.url; // this tells the server from which url, request is coming from

  if (pathName === "/" || pathName === "/home") {
    res.end("this is the home page");
  } else if (pathName === "/wishlist") {
    res.end("this is the wishlist page");
  } else if (pathName === "/api") {
    //we are using the data in the data.json file and parsing it to convert it into string
    fs.readFile("./data.json", "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-type": "application/json" }); //specify the datatype first so browser understand the data format incoming
      res.end(data);
    });
  } else {
    res.end("page not found !");
  }
});


// but here we are decresing the performance ,each time when the user sends an request , json file readed, 
// but we can do it optimally, data is read at the time of server starts and sends when user req it , 
// this will avoid each time when req is coming we are accessing data
// if we specify the readfile function synchronously on the top level of 
// code then when the server starts it loads the data first then callback function is run.
// to do this we can just write : delete the line number 15 and 16  and write it as :
//const data =  fs.readFile("./data.json", "utf-8")
// const productData = JSON.parse(data);
// write this two lines above the call back function
// and then use productData in the server callback function


server.listen(8000, "127.0.0.1", () => {
  console.log("listening on request on the 8000 port");
});
