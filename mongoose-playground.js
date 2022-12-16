//const {mongoose, Schema} = require('mongoose');

const mongoose = require('mongoose');

const Pizza = require("./models/Pizza.model.js");



mongoose
  .connect('mongodb://127.0.0.1/pizzaForEach')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    const newPizza = {
        title: "FUNGI-three",
        price: 12,
        ingredients:  ["mozzarella", "tomato sauce", "seafood"],
    }

    return Pizza.create(newPizza)
  })
  .then( (pizzaFromDB) => {
    // console.log("a new pizza was created!!");
    // console.log(pizzaFromDB);

    const newPizzasArr = [
        {
            title: "carbonara",
            price: 15
        },
        {
            title: "bbq",
            price: 16
        }
    ]


    return Pizza.insertMany(newPizzasArr)
  })
  .then( pizzaArrFromDB => {
    // console.log(pizzaArrFromDB);

    // return Pizza.findById("639b3100f138520e9ce61118")
    return Pizza.find({price: 15})
  })
  .then( (responseFromMongoose) => {
    // console.log(responseFromMongoose);

    // return Pizza.findByIdAndUpdate("639b380870c5a76f93d89022", {price: 50, isGlutenFree: true}, { returnDocument: 'after' })

    return Pizza.updateMany({title: "carbonara"}, {price: 80})

  } )
  .then( (responseFromMongoose) => {
    // console.log(responseFromMongoose)
    // return Pizza.findByIdAndRemove("639b380870c5a76f93d89022")
    return Pizza.deleteMany({title: "carbonara"})
    // return Pizza.deleteMany({})
  } )
  .then( responseFromMongoose => {
    console.log(responseFromMongoose)
  })
  .catch(err => console.error('Error... ', err));


