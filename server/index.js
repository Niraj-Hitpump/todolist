const express =require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const todomodel = require('./Models/Todo')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://pythoncourse053:unoN2Rjj8PvqZs64@masterall.h6zzb.mongodb.net/mern')

app.get('/get',(req,res)=>{
    todomodel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err)) 
})

app.put('/update',(req,res)=>{
    const {id}=req.params;
    todomodel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    todomodel.findByIdAndDelete(id) // Directly pass `id` here
        .then(result => {
            if (result) {
                res.json({ success: true, id });
            } else {
                res.status(404).json({ success: false, message: "Item not found" });
            }
        })
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});


app.post('/add',(req,res)=>{
    const task=req.body.task;
    todomodel.create({
        task:task
    }).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        res.json(err)
    })
})

app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
})