import express from 'express';
import cors from 'cors';
import {connectKorbe, getConnection} from "./connection.js"
const app= express();
const port=5000;
let db;

app.use(cors());
app.use(express.json());

connectKorbe(function(err){
    if(!err){
        app.listen(port);
        db=getConnection();
    }
    else{
        console.error('Database Connection Error Zarif');
    }
});


app.get("/getusers", function(req, res) {

    let users=[];
    db.collection('user').find().forEach(element => {
        users.push(element);
    }).then(function(){
        res.json(users);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

app.get("/getusers/:email", function(req, res) {
    const email=req.params.email;

    db.collection('user').findOne({email: email},{projection:{password:1,_id:0}}).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})



app.post("/insertuser", function(req, res) {
    const user=req.body;
    db.collection('user').insertOne(user).then(function(result){
        res.json(result);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})