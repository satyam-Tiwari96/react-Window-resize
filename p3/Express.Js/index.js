const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);
require("./database/db.js");
const PORT = process.env.PORT || "8080";
server.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

// const http=require('http');

// const app=require('./app.js')

// const server=http.createServer(app);

// const port =process.env.PORT || '8080';

// server.listen(port,()=>{

// console.log(`server started from latest update ${port}`)

// })
