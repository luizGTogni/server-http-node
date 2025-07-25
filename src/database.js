import fs from 'node:fs/promises';
import { randomUUID } from "node:crypto";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, "utf8")
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            });
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {
        const data = this.#database[table] ?? []; 
        return data;
    }

    insert(table, data) {
        const id = randomUUID();

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push({...data, id});
            this.#persist();
            return data;
        }

        this.#database[table] = [{...data, id}];
        this.#persist();
        return data;
    }
}