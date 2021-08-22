var http = require("http");     // node 내장 모듈 불러옴
var hostname = '127.0.0.1';     // localhost와 동일, 본인 컴퓨터
var port = 8080;

const server = http.createServer(function(req, res){
    const path = req.url;
    const method = req.method;
    if(path === "/products"){
        if(method === "GET"){
            res.writeHead(200,{"Content-Type": "application/json"})
            const products = JSON.stringify([
                {
                    name: "농구공",
                    price: 5000,
                },
            ]);
            res.end(products);
        }else if(method === "Post"){
            res.end("생성되었습니다!");
        }
    }
    res.end("Good Bye");
})

server.listen(port, hostname);     // listen : 기다리고 있다

console.log("grab market server on!");