import http from "node:http";
import { json } from "./middlewares/json.js";

const users = [];

const server = http.createServer(async (req, res) => {
    await json(req, res)

    const { method, url, body } = req;

    if (method === "GET" && url === "/users") {
        return res.writeHead(200).end(JSON.stringify(users));
    }

    if (method === "POST" && url === "/users") {
        const user = { id: users.length + 1, name: body["name"], email: body["email"] };

        users.push(user);

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end(JSON.stringify({ "error": "route not found" }));
});

server.listen(3000, () => console.log("Server is running..."));