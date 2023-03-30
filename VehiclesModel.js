const mongoose = require('mongoose')
const VehiclesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        default:0
    }
})
const Vehicles = new mongoose.model('xeco',VehiclesSchema)
module.exports = Vehicles