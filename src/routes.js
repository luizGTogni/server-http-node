import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");
      return res.writeHead(200).end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = { name, email };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
];
