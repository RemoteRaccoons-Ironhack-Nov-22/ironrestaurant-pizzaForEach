const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
        //unique: true, // note: "The unique Option is Not a Validator. It's a convenient helper for building MongoDB unique indexes"
    },
    price: {
        type: Number,
        min: 5,
        max: 99
    },
    isGlutenFree: {
        type: Boolean,
        default: false
    },
    isVeggie: Boolean,
    ingredients: [String],
    size: {
        type: String,
        enum: ["Small", "Medium", "Large"]
    },
});

const Pizza = mongoose.model("Pizza", pizzaSchema); // create model Pizza


module.exports = Pizza;