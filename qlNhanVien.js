const express = require('express')
const mongoose = require('mongoose')
const uri = require('./mylocalNhanVien')
const expressHbs = require('express-handlebars')
const nhanvienModel = require('./NhanVienModel')
const mongodb = require('mongodb')
const app = express()
app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    defaultLayout: 'main',
    layoutsDir: "views/layouts/"
}))
app.set('view engine', '.hbs')
app.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri)
        const listNV = await nhanvienModel.find().lean()
        res.render('pagelistNV', { dataNV: listNV })
    } catch (error) {
        console.log(error);
    }

})
app.get('/addNV', async (req, res) => {
    let name = req.query.nameNV
    let address = req.query.addressNV
    let salary = parseInt(req.query.salaryNV)
    let nv = new nhanvienModel({
        ten: name,
        diachi: address,
        luong: salary

    })
    console.log(req.body);
    try {
        await nv.save()
        res.redirect('/')
    } catch (error) {

    }
})
app.get('/deleteNV', async (req, res) => {
    let idNV = req.query.idNV
    try {
        nhanvienModel.collection.deleteOne({ _id: new mongodb.ObjectId(`${idNV}`) })
        res.redirect('/')
    } catch (error) {

    }
    console.log(idNV);
})
app.get('/upNV', async (req, res) => {
    let idUp = req.query.idEdit
    // // let nvNew = await nhanvienModel.find({_id: new mongodb.ObjectId(`${idUp}`)})
    console.log(idUp);
    try {
        const listNV = await nhanvienModel.find().lean()
        let nvUp = await nhanvienModel.find({ _id: new mongodb.ObjectId(`${idUp}`) }).lean()
        res.render('pageUpdate', { dataNV: listNV, nv: nvUp[0], index: idUp })
    } catch (error) {
        console.log(error);
    }
})
app.get('/upNV/update', async (req, res) => {
    let name = req.query.nameNV
    let address = req.query.addressNV
    let salary = parseInt(req.query.salaryNV)
    let idNV = req.query.idNVien
    try {
        await mongoose.connect(uri)
        await nhanvienModel.collection.updateOne({ _id: new mongodb.ObjectId(`${idNV}`)}, { $set: { ten: name, diachi:address, luong: salary } })
        res.redirect('/')        
    } catch (error) {
        
    }
})
app.listen(3000, (req, res) => {
    console.log("Dang chay");
})