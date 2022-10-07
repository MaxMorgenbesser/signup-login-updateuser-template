import {creds} from "./cred.js"
import {MongoClient} from "mongodb";

export default function dbConnect(){
        const client = new MongoClient(creds);
        const db = client.db("users");
        const collection = db.collection("users");
        return collection;
}