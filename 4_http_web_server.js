const http = require('http');
const http = require('http');


// server
const server = http.createServer((req ,res)=> {
    res.end("Hello From the server !");  
});      
// each time we recive the request on the server call back function is called and res is send back
// here .end is the one of the way to send the response back to the server


server.listen(8000, '127.0.0.1', () => {
    console.log("listing to the requesting on port 8000")
})        // this is the port number and local host address 