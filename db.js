const Database = require("@replit/database");
require('dotenv').config();
const client = new Database(process.env.REPLIT_DB_URL);


const getSync = (key, callback) => {
    return client.get(key)
        .then(result => callback(result))
        .catch(console.error);
}

const get = async (key) => {
    return client.get(key);
}

const getAll = async () => {
    return client.getAll();
}

const set = async (key, value) => {
    return client.set(key, value);
}

const remove = (key) => {
    return client.delete(key)
}

const purge = () => {
    return client.empty();
}

const db = {
    get,
    getAll,
    getSync,
    purge,
    remove,
    set
}

module.exports = db;