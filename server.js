import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3035;
app.use(express.json());
app.use(cors());
const url="mongodb+srv://Admin:KOE0JTLXrEa8sgPs@todolistcluster.e7zte.mongodb.net/ToDoDB?retryWrites=true&w=majority"
// mongoose.connect("mongodb://localhost:27017/ToDoV2", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const schema = new mongoose.Schema({
    name: String
});
let Model
app.get("/", (req, res)=> res.status(200).send("Hello"));

app.post("/Data", (req, res)=>{
    const {day}=req.body
    Model = mongoose.model(day, schema);
    Model.find({}, (err, foundItem)=>{
        if(err){
            console.log(err);
        }else {
            res.json(foundItem);
        }
    })
})
app.post("/AddItems", (req, res)=>{
    const {Item}=req.body;
    const newItem = new Model({
        name: Item
    });
    newItem.save();
    res.json("Item was added")
})
app.delete("/AddItems", (req,res)=>{
    const {Item}=req.body;
    Model.deleteOne({name:Item}, function(err){
        if(err){
            console.log(err);
        }
    })
})


app.listen(port, ()=> console.log(`Sv are running on port ${port}`));