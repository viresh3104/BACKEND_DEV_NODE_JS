const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url; // this tells the server from which url the request is coming from

  if (pathName === "/" || pathName === "/home") {
    res.end("this is the home page");
  } else if (pathName === "/wishlist") {
    res.end("this is the wishlist page");
  } else {
    res.end("page not found !");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on request on the 8000 port");
});

// now we will add the api in this code
// In the next file
