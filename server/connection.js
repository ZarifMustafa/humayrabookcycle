import "dotenv/config";
import { MongoClient } from "mongodb";

let con;
const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("MONGODB_URI is not set. Add it to server/.env (see server/.env.example).");
}

function connectKorbe(callback) {
  MongoClient.connect(url)
    .then((client) => {
      con = client.db("BookCycle");
      return callback();
    })
    .catch((err) => {
      return callback(err);
    });
}

const getConnection = () => con;

export { connectKorbe, getConnection };
