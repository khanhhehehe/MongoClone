const express = require('express')
const expressHbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const labModel = require('./labModel')
const uri = 'mongodb+srv://khanhnqph27525:fonsbTKypO0rMHH7@cluster0.mnkqo5f.mongodb.net/clone1?retryWrites=true&w=majority'
app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    defaultLayout: 'main',
    layoutsDir: "views/layouts/"
}))
app.set('view engine', '.hbs')
app.get('/', async (req, res) => {
    await mongoose.connect(uri).then(console.log("ket noi db thanh cong"))
    try {
        const labs = await labModel.find()
        console.log(labs.toString());
        res.send(labs)
    } catch (error) {
        console.log(error);
    }

})
app.get('/add', async (req, res) => {
    await mongoose.connect(uri).then(console.log("ket noi db thanh cong"))
    let lab = new labModel({
        tieude: 'lab clone 5',
        noidung: 'bai tap moi',
        tailieu: 5
    })
    try {
        let kq = await lab.save()
        console.log(kq);
        let labs = await labModel.find()
        res.send(labs)
    } catch (error) {

    }
})
app.get('/delete', async (req, res) => {
    await mongoose.connect(uri).then(console.log("ket noi db thanh cong"))
    try {
        labModel.collection.deleteOne({tailieu: 5})
        const labs = await labModel.find()
        console.log(labs);
        res.send(labs)
    } catch (error) {
        console.log(error);
    }
})
app.get('/update',async (req,res)=>{
    await mongoose.connect(uri).then(console.log("ket noi db thanh cong"))
    try {
        labModel.collection.updateOne({tailieu: 5},{ $set: {tailieu: 7} })
        const labs = await labModel.find()
        console.log(labs);
        res.send(labs)
    } catch (error) {
        console.log(error);
    }
})
app.listen(3000, (req, res) => {
    console.log('Dang chay roi');
})
