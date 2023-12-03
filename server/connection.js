import { MongoClient } from "mongodb";

let con;
const url = "mongodb+srv://Zarif_Mustafa:p_202114107@cluster0.8le4rjx.mongodb.net/?retryWrites=true&w=majority";

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
