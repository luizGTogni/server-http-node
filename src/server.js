import http from "node:http";

users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "POST" && url === "/users") {
        user = { id: 1, name: "Luiz Togni", email: "trueluizbr@gmail.com" };

        users.push(user)

        res.writeHead(201).end();
    }

    if (method === "POST" && url === "/users") {
        res.writeHead(201).end();
    }

    res.writeHead(404).end(JSON.stringify({ "error": "route not found" }));
});

server.listen(3000, () => console.log("Server is running..."));