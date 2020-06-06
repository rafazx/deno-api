import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
console.log(Deno.env.get('DB_URI'))
client.connectWithUri(Deno.env.get('DB_URI') || '');
const db = client.database(Deno.env.get('DB_NAME') || '');

export default db;
