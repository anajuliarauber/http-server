import http from "http";
import fs from "fs";
import querystring from "querystring";

const filePath = "/home/anajulia/Documents/Lets-code/modulo-6-backend/trabalho-final/text.txt"

const server = http.createServer((req, res)=>{
    const {url, method} = req;
    

    if (url === "/GET" && method === "GET"){
        fs.promises.readFile(filePath,{encoding: 'utf8'})
        .then(console.log)
        .then(res.end('Conteúdo obtido'));
    }

    if (url.match("/POST/(.+)") && method === "POST"){
        const routes = url.split("/");
        const data = querystring.unescape(routes[2]);
        console.log(data);
        fs.promises.appendFile(filePath, data, {encoding: 'utf8'})
        .then(res.end('Conteúdo anexado'));
    }
})

server.listen(3000)