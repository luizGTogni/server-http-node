import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;
      const filters = { name: search, email: search };
      const users = database.select("users", search ? filters : null);
      return res.writeHead(200).end(JSON.stringify(users));
    },
  },
  {
    method: "GET",
    url: buildRoutePath("/users/:userId"),
    handler: (req, res) => {
      const { userId } = req.params;
      const user = database.selectById("users", userId);
      return res.writeHead(200).end(JSON.stringify(user));
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
    method: "PUT",
    url: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, { name, email });

      return res.writeHead(204).end();
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
